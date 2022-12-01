import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState, useMemo, useContext } from "react";
import EachClient from "../../components/client/EachClient";
import { useDispatch, useSelector } from "react-redux";
import { ChooseContext } from "../../context/choose-context";
import { useNavigation } from "@react-navigation/native";
import {
  fetchProperties,
  selectAllProperties,
} from "../../redux/properties-slice";
import EachProperty from "../../components/property/EachProperty";
import SearchBar from "../../components/UI/SearchBar";

export default function ChooseProperty() {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const { setSelectedProperty } = useContext(ChooseContext);

  const dispatch = useDispatch();
  const allProperties = useSelector(selectAllProperties);
  const status = useSelector((state) => state.properties.status);

  const filteredData = useMemo(() => {
    return allProperties.filter((el) => {
      const textData = searchInput.toLowerCase();
      const propertyName =
        el.street + " " + el.city + " " + el.state + " " + el.zip;
      const propertyData = propertyName.toLowerCase();
      return propertyData.indexOf(textData) > -1;
    });
  }, [searchInput, allProperties]);

  useEffect(() => {
    if (status !== "succeeded") {
      dispatch(fetchProperties());
    }
  }, []);

  const handleSelectProperty = (item) => {
    setSelectedProperty(item);
    navigation.goBack();
  };

  const renderProperty = useCallback(
    ({ item, index }) => (
      <EachProperty
        handlePress={() => handleSelectProperty(item)}
        index={index}
        street={item.street}
        city={item.city}
        state={item.state}
        zipCode={item.zip}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.exitContainer}
        >
          <AntDesign name="left" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Select a Property</Text>
        <View style={styles.searchHeaderContainer}>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleClearSearch={() => setSearchInput("")}
          />
        </View>
      </View>

      <View style={styles.list}>
        <FlatList
          data={filteredData}
          renderItem={renderProperty}
          keyExtractor={(c) => c.id}
          refreshing={status !== "succeeded"}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  headingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#f1f1f1",
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: "700",
    color: "#212121",
  },
  searchHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
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
  list: {
    flex: 1,
  },
});
