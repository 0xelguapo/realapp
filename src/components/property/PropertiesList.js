import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useCallback, useEffect, useState, useMemo, useContext } from "react";
import EachProperty from "./EachProperty";
import { selectAllProperties } from "../../redux/properties-slice";
import SearchBar from "../UI/SearchBar";

export default function PropertiesList({
  handleGoBack,
  handleSelectProperty,
  searchInput,
  setSearchInput,
  filteredData,
  status,
}) {
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
        <TouchableOpacity onPress={handleGoBack} style={styles.exitContainer}>
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
        {status !== "succeeded" ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderProperty}
            keyExtractor={(c) => c.id}
            refreshing={status !== "succeeded"}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        )}
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
  loadingContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
