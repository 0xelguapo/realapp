import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useCallback, useEffect, useState } from "react";
import { ClientsContext } from "../../context/client-context";
import EachClient from "../../components/client/EachClient";

export default function AddReminder(props) {
  const { clientsArray, isLoading } = useContext(ClientsContext);
  const [filteredData, setFilteredData] = useState(clientsArray);
  const [searchInput, setSearchInput] = useState("");

  const renderClient = useCallback(
    ({ item, index }) => (
      <EachClient
        onPress={() => handleSelectClient(item.id)}
        index={index}
        name={item.name}
        phone={item.phone}
        taskMode={true}
        company={item.company}
      />
    ),
    []
  );

  const handleSelectClient = (id) => {
    props.navigation.navigate("EditReminder", { clientId: id, homeMode: true });
  };

  const handleSearch = (text) => {
    if (text) {
      const selectedData = clientsArray.filter((c) => {
        const clientData = c.name ? c.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return clientData.indexOf(textData) > -1;
      });
      setFilteredData(selectedData);
      setSearchInput(text);
    } else {
      setFilteredData(clientsArray);
      setSearchInput(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.exitContainer}
        >
          <AntDesign name="left" size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Select a Client</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search" size={20} color="black" />
          <TextInput
            style={styles.input}
            value={searchInput}
            onChangeText={handleSearch}
            placeholder="Search for a name, category..."
          />
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={filteredData}
          renderItem={renderClient}
          keyExtractor={(c) => c.id}
          refreshing={isLoading}
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
    paddingHorizontal: 20,
  },
});
