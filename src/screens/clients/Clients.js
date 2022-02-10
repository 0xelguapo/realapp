import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  Alert,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import EachClient from "../../components/EachClient";
import { Ionicons } from "@expo/vector-icons";

export default function Clients({ navigation, id }) {
  const [clientsArray, setClientsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const getAllClients = useCallback(async () => {
    setIsLoading(true);
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.listClients));
    } catch (err) {
      console.log("error getting clients", err);
    }
    setClientsArray(response.data.listClients.items);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getAllClients();
    console.log("gettingAllClients");
  }, []);

  const viewClientHandler = useCallback((client) => {
    navigation.navigate("ClientDetails", { client: client });
  }, []);

  const renderClient = useCallback(({ item }) => (
    <EachClient
      onPress={() => viewClientHandler(item)}
      name={item.name}
      phone={item.phone}
      company={item.company}
    />
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Clients</Text>
        <View style={styles.addIconContainer}>
          <Ionicons
            name="ios-person-add"
            size={22}
            color="white"
            onPress={() => navigation.navigate("AddClient")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search" size={20} color="black" />
          <TextInput style={styles.input} />
        </View>
      </View>
      <View style={styles.list}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={clientsArray}
            renderItem={renderClient}
            keyExtractor={(c) => c.id}
            onRefresh={getAllClients}
            refreshing={isLoading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    flex: 0.15,
    backgroundColor: "#212121",
    paddingHorizontal: 25,
    paddingTop: 70,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "700",
    color: "#e9e9e9",
  },
  addIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 25,
    top: 68,
    height: 45,
    width: 45,
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
    marginTop: 25,
    flexDirection: "row",
    paddingHorizontal: 8,
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    shadowRadius: 4,
    shadowColor: "rgba(34, 34, 34, 0.4)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
    },
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  list: {
    flex: 1,
  },
});
