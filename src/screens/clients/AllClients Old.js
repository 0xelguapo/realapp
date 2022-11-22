import {
  useEffect,
  useCallback,
  useRef,
  useState,
  useMemo,
  useContext,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Animated,
  Pressable,
  TouchableOpacity,
  FlatList,
  SectionList,
} from "react-native";
import EachClient from "../../components/client/EachClient";
import EachProperty from "../../components/property/EachProperty";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients, selectAllClients } from "../../redux/clients-slice";
import {
  fetchProperties,
  selectAllProperties,
} from "../../redux/properties-slice";
import { Geo } from "aws-amplify";

export default function Clients({ navigation }) {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.clients.status);
  const allClients = useSelector(selectAllClients);
  const allProperties = useSelector(selectAllProperties);
  const propertiesAndClients = [...allClients, ...allProperties];

  const [suggestedAddresses, setSuggestedAddresses] = useState([]);

  const allData = [
    { title: "Contacts", data: allClients },
    { title: "Properties", data: allProperties },
    { title: "Suggested Addresses", data: suggestedAddresses },
  ];

  const searchOptionContraints = {
    countries: ["USA"],
    maxResults: 5,
  };

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchInput.length > 6) {
        const result = await Geo.searchByText(
          searchInput,
          searchOptionContraints
        );
        console.log(result);
        setSuggestedAddresses(result);
      }
    }, 1500);
    return () => clearTimeout(delaySearch);
  }, [searchInput]);

  const favoriteClients = useMemo(() => {
    return allClients.filter((c) => {
      return c.favorite === true;
    });
  }, [allClients]);

  const filteredContactsAndProperties = useMemo(() => {
    return propertiesAndClients.filter((data) => {
      const fullName = data.firstName + " " + data?.lastName;
      const propertyName =
        data.street + " " + data.city + " " + data.state + " " + data.zip;
      const propertyData = propertyName.toLowerCase();
      const clientData = fullName
        ? fullName.toLowerCase()
        : data.firstName.toLowerCase();
      const textData = searchInput.toLowerCase();
      return (
        clientData.indexOf(textData) > -1 || propertyData.indexOf(textData) > -1
      );
    });
  }, [searchInput, allClients, allProperties, status]);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -90],
    extrapolate: "clamp",
  });

  const viewClientHandler = useCallback((client, index) => {
    navigation.navigate("ClientDetails", { client: client, index: index });
  }, []);

  const renderClient = useCallback(({ item, index, section }) => {
    if (item.firstName)
      return (
        <EachClient
          onPress={() => viewClientHandler(item, index)}
          index={index}
          firstName={item.firstName}
          lastName={item.lastName}
          phone={item.phone}
          company={item.company}
        />
      );
    else {
      return (
        <EachProperty
          street={item.street}
          city={item.city}
          state={item.state}
          zipCode={item.zip}
          handlePress={() =>
            navigation.navigate("PropertyDetails", { id: item.id })
          }
        />
      );
    }
  }, []);

  const getAllProperties = async () => {
    dispatch(fetchProperties());
  };

  const getAllClients = async () => {
    dispatch(fetchClients());
  };

  useEffect(() => {
    getAllClients();
    getAllProperties();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View
            style={{ backgroundColor: "#f5f5f5", zIndex: 1, paddingBottom: 10 }}
          >
            <Text style={styles.headerText}>Contacts / Properties</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="ios-search" size={20} color="black" />
              <TextInput
                style={styles.input}
                placeholderTextColor="#7b7b7c"
                placeholder="Search existing. Type any address to quick add"
                returnKeyType="done"
                onChangeText={setSearchInput}
                value={searchInput}
              />
              {searchInput.length !== 0 && (
                <TouchableOpacity onPress={() => setSearchInput("")}>
                  <Feather name="x-circle" size={20} color="#7b7b7c" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Animated.View
            style={[{ transform: [{ translateY: headerScrollHeight }] }]}
          >
            <Text style={{ fontWeight: "700" }}>Favorites</Text>
          </Animated.View>
          <View>
            <Animated.ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={[
                {
                  transform: [{ translateY: headerScrollHeight }],
                  position: "absolute",
                  top: 10,
                  width: "100%",
                },
              ]}
            >
              {favoriteClients.length > 0 ? (
                favoriteClients.map((client, index) => {
                  return (
                    <Pressable
                      style={styles.favoriteClient}
                      key={client.id}
                      onPress={() => viewClientHandler(client, index)}
                    >
                      <Text style={styles.favoriteFirstLetter}>
                        {client.firstName[0].toUpperCase()}
                      </Text>
                      <Text style={styles.favoriteName}>
                        {client.firstName + " " + client.lastName}
                      </Text>
                    </Pressable>
                  );
                })
              ) : (
                <Text style={{ color: "#ababab" }}>
                  Your favorites will be shown here...
                </Text>
              )}
            </Animated.ScrollView>
          </View>
        </View>
        <View style={styles.list}>
          {status !== "succeeded" ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <>
              <Animated.SectionList
                sections={allData}
                renderItem={renderClient}
                keyExtractor={(item) => item.id}
                refreshing={status !== "succeeded"}
                renderSectionHeader={({ section: { title }}) => title!== 'Contacts' && <Text>{title}</Text>}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={
                  filteredContactsAndProperties.length > 0 && {
                    paddingVertical: 50,
                  }
                }
              />
              {/* <Animated.FlatList
                data={filteredContactsAndProperties}
                renderItem={renderClient}
                keyExtractor={(c) => c.id}
                onRefresh={getAllClients}
                refreshing={status !== "succeeded"}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                style={{ marginTop: 5 }}
                contentContainerStyle={filteredContactsAndProperties.length > 0 && {paddingVertical: 50}}
              />
              {suggestedAddresses.length > 0 &&
                searchInput.length > 5 &&
                suggestedAddresses.map((sug, index) => {
                  if (filteredContactsAndProperties.length === 0)
                    return (
                      <View key={index} style={styles.suggestedContainer}>
                        <View style={styles.suggestion}>
                          <Text>{sug.label} </Text>
                        </View>
                      </View>
                    );
                })} */}
            </>
          )}
        </View>
        <TouchableOpacity
          style={styles.addIconContainer}
          onPress={() => navigation.navigate("AddClient")}
        >
          <Ionicons name="ios-person-add" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingBottom: 15,
    zIndex: 3,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#454545",
  },
  addIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 30,
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#0064e5",
    shadowRadius: 4,
    shadowColor: "rgba(34, 34, 34, 0.58)",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 4,
    },
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 15,
    flexDirection: "row",
    paddingHorizontal: 8,
    borderColor: "#e9e9e9",
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderRadius: 5,
    shadowRadius: 2,
    shadowColor: "rgba(34, 34, 34, 0.2)",
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
    },
    zIndex: 2,
  },
  input: {
    flex: 1,
    height: 35,
    paddingLeft: 10,
  },
  favorites: {},
  favoriteClient: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    width: 70,
    flex: 1,
    marginRight: 20,
  },
  favoriteFirstLetter: {
    fontSize: 25,
    fontWeight: "600",
  },
  favoriteName: {
    fontSize: 10,
    fontWeight: "300",
    textAlign: "center",
  },
  list: {
    display: "flex",
    flex: 1,
  },
  fadingContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: 10,
    padding: 10,
    backgroundColor: "#026bff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4e97ff",
    width: "95%",
    alignSelf: "center",
  },
  successText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  suggestedContainer: {
    display: "flex",
  },
  suggestion: {
    display: "flex",
    alignItems: "center",
    borderWidth: 1,
    height: 30,
  },
});
