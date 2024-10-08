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
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";
import EachClient from "../../components/client/EachClient";
import EachProperty from "../../components/property/EachProperty";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchClients, selectAllClients } from "../../redux/clients-slice";
import {
  addProperty,
  fetchProperties,
  selectAllProperties,
} from "../../redux/properties-slice";
import { Geo } from "aws-amplify";
import { SuccessContext } from "../../context/success-context";
import SuggestedProperty from "../../components/property/SuggestedProperty";
import MultiAddButton from "../../components/UI/MultiAddButton";
import SearchBar from "../../components/UI/SearchBar";
import { AuthContext } from "../../context/auth-context";
import ProIcon from "../../components/UI/ProIcon";

export default function Clients({ navigation }) {
  const sectionListRef = useRef(null);
  const { isProUser } = useContext(AuthContext);

  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.clients.status);
  const allClients = useSelector(selectAllClients);
  const allProperties = useSelector(selectAllProperties);
  const [suggestedLoading, setSuggestedLoading] = useState(false);
  const [suggestedAddresses, setSuggestedAddresses] = useState([
    {
      addressNumber: "Type any full address in the search bar to quick add",
      street: "",
      municipality: "You can search anywhere",
      region: "within the US!",
      postalCode: "",
      add: false,
    },
  ]);

  const { onStatusChange } = useContext(SuccessContext);

  const scrollToProperties = () => {
    sectionListRef.current.scrollToLocation({
      itemIndex: allClients.length - 1,
      viewOffset: -170,
      viewPosition: 0,
    });
  };

  const scrollToTop = () => {
    sectionListRef.current.scrollToLocation({
      itemIndex: 0,
      viewOffset: 100,
    });
  };

  const quickAddProperty = async (item) => {
    let propertyDetails = {
      street: item.addressNumber
        ? item.addressNumber + " " + item.street
        : item.street,
      city: item.municipality,
      state: item.region,
      zip: item.postalCode,
    };
    const response = await dispatch(addProperty(propertyDetails)).unwrap();
    if (response) {
      console.log(response);
      onStatusChange("PROPERTY CREATED");
    }
  };

  const searchOptionContraints = {
    countries: ["USA"],
    maxResults: 5,
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSuggestedAddresses([]);
  };

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (searchInput.length > 6) {
        let result;
        setSuggestedLoading(true);
        try {
          result = await Geo.searchByText(searchInput, searchOptionContraints);
        } catch (err) {
          console.error(err);
        } finally {
          setSuggestedLoading(false);
        }
        if (result) {
          setSuggestedAddresses(result);
        }
      }
    }, 1200);
    return () => clearTimeout(delaySearch);
  }, [searchInput]);

  const favoriteClients = useMemo(() => {
    return allClients.filter((c) => {
      return c.favorite === true;
    });
  }, [allClients]);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  const viewClientHandler = useCallback((client, index) => {
    navigation.navigate("ClientDetails", { client: client, index: index });
  }, []);

  const viewAllGroupsHandler = () => {
    if (!isProUser) {
      navigation.navigate("Paywall");
    } else {
      navigation.navigate('ViewAllGroups')
    }
  }

  const renderProperty = useCallback(({ item, index }) => {
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
  }, []);

  const renderSuggested = useCallback(
    ({ item, index }) => {
      return (
        <>
          {!suggestedLoading ? (
            <SuggestedProperty
              item={item}
              handlePress={() => quickAddProperty(item)}
              buttonText={"+ Add"}
            />
          ) : (
            <View style={styles.searchResultLoading}>
              <ActivityIndicator size="small" />
            </View>
          )}
        </>
      );
    },
    [suggestedLoading]
  );

  const renderClient = useCallback(({ item, index }) => {
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
  }, []);

  const allData = [
    { title: "Contacts", renderItem: renderClient, data: allClients },
    { title: "Properties", renderItem: renderProperty, data: allProperties },
    {
      title: "Suggested Addresses",
      renderItem: renderSuggested,
      data: suggestedAddresses,
    },
  ];

  const filteredAllData = useMemo(() => {
    return allData.reduce((acc, section) => {
      const { title, data, renderItem } = section;
      const filtered = data.filter((el) => {
        const textData = searchInput.toLowerCase();
        if (title === "Contacts") {
          const fullName = el.firstName + " " + el?.lastName;
          const clientData = fullName
            ? fullName.toLowerCase()
            : data.firstName.toLowerCase();
          return clientData.indexOf(textData) > -1;
        } else if (title === "Properties") {
          const propertyName =
            el.street + " " + el.city + " " + el.state + " " + el.zip;
          const propertyData = propertyName.toLowerCase();
          return propertyData.indexOf(textData) > -1;
        } else if (title === "Suggested Addresses") {
          return true;
        }
      });
      if (filtered.length !== 0) {
        acc.push({ title, data: filtered, renderItem });
      }
      return acc;
    }, []);
  }, [searchInput, allClients, allProperties, status, allData]);

  useEffect(() => {
    const getAllProperties = async () => {
      dispatch(fetchProperties());
    };

    const getAllClients = async () => {
      dispatch(fetchClients());
    };
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
            <View style={styles.headerTextContainer}>
              <Pressable onPress={scrollToTop}>
                <Text style={styles.headerText}>Contacts / </Text>
              </Pressable>
              <Pressable onPress={scrollToProperties}>
                <Text style={styles.headerText}>Properties</Text>
              </Pressable>
            </View>
            <View style={styles.searchHeaderContainer}>
              <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleClearSearch={handleClearSearch}
              />
              <TouchableOpacity
                style={styles.viewGroups}
                onPress={viewAllGroupsHandler}
              >
                <ProIcon top={-5} right={-12} small={true} />
                <Ionicons name="people-outline" size={24} color="#0064e5" />
              </TouchableOpacity>
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
                  top: 5,
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
                ref={sectionListRef}
                sections={filteredAllData}
                onScrollToIndexFailed={() => {
                  return;
                }}
                renderItem={({ section: { renderItem } }) => (
                  <View>{renderItem}</View>
                )}
                keyExtractor={(item, index) => item.id + index + item.label}
                refreshing={status !== "succeeded"}
                renderSectionHeader={({ section: { title } }) => (
                  <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeaderText}>{title}</Text>
                  </View>
                )}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingVertical: 50 }}
              />
            </>
          )}
        </View>
        <MultiAddButton showAddClient={true} showAddProperty={true} pro={allClients.length > 20} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 2,
    paddingTop: 50,
  },
  headerTextContainer: {
    flexDirection: "row",
    paddingTop: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  searchHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  sectionHeaderContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    paddingVertical: 5,
  },
  sectionHeaderText: {
    fontWeight: "600",
  },
  viewGroups: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
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
    flex: 1,
    alignItems: "center",
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
    height: 50,
    width: 70,
    flex: 1,
    marginRight: 20,
  },
  favoriteFirstLetter: {
    fontSize: 22,
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
  searchResultContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchResultTextContainer: {
    flex: 1,
  },
  searchResultTitle: {
    fontWeight: "500",
    color: "#454545",
  },
  searchResultSubtitle: {
    fontWeight: "300",
    color: "#6c6c6c",
  },
  searchAddContainer: {
    width: 40,
  },
  searchAddText: {
    fontWeight: "500",
    color: "#0064e5",
  },
  searchResultLoading: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
