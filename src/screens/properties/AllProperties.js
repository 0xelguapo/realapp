import {
  useEffect,
  useCallback,
  useRef,
  useState,
  useMemo,
  useContext,
} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProperties,
  selectAllProperties,
} from "../../redux/properties-slice";
import EachProperty from "../../components/property/EachProperty";

export default function AllProperties({ navigation }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.properties.status);
  const allProperties = useSelector(selectAllProperties);
  const [searchInput, setSearchInput] = useState("");

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      const propertyData = p.street ? p.street.toUpperCase() : "".toUpperCase();
      const textData = searchInput.toUpperCase();
      return propertyData.indexOf(textData) > -1;
    });
  }, [searchInput, allProperties]);

  const renderProperty = useCallback(
    ({ item, index }) => (
      <EachProperty
        street={item.street}
        city={item.city}
        state={item.state}
        zipCode={item.zip}
        handlePress={() => navigation.navigate('PropertyDetails', { id: item.id })}
      />
    ),
    []
  );

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Properties</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search" size={20} color="black" />
          <TextInput
            style={styles.input}
            placeholderTextColor="#7b7b7c"
            placeholder="Search by street address"
            returnKeyType="done"
            onChangeText={setSearchInput}
            value={searchInput}
          />
          {searchInput.length !== 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Feather name="x-circle" size={20} color="#7b7b7c" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredProperties}
          renderItem={renderProperty}
          keyExtractor={(p) => p.id}
          onRefresh={() => dispatch(fetchProperties())}
          refreshing={status !== "succeeded"}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
      <TouchableOpacity
        style={styles.addIconContainer}
        onPress={() => navigation.navigate("AddProperty")}
      >
        <AntDesign name="addfile" size={25} color="white" />
      </TouchableOpacity>
    </View>
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
  listContainer: {
    flex: 1,
  }
});
