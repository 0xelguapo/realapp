import { useEffect, useState } from "react";
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
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import EachClient from "../../components/EachClient";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
  {
    name: "Harrison Owen",
    company: "Dark Skins United",
    phone: "13109221824",
  },
  {
    name: "Jackson Trinidad",
    company: "Michael Skins United",
    phone: "3109221824",
  },
  {
    name: "MoneyMan Krabs",
    company: "Crab Skins United",
    phone: "3109221824",
  },
  {
    name: "Harrison Owen",
    company: "Dark Skins United",
    phone: "3109221824",
  },
  {
    name: "Jackson Trinidad",
    company: "Michael Skins United",
    phone: "3109221824",
  },
  {
    name: "MoneyMan Krabs",
    company: "Crab Skins United",
    phone: "3109221824",
  },
  {
    name: "Harrison Owen",
    company: "Dark Skins United",
    phone: "3109221824",
  },
  {
    name: "Jackson Trinidad",
    company: "Michael Skins United",
    phone: "3109221824",
  },
  {
    name: "MoneyMan Krabs",
    company: "Crab Skins United",
    phone: "3109221824",
  },
  {
    name: "Harrison Owen",
    company: "Dark Skins United",
    phone: "3109221824",
  },
  {
    name: "Jackson Trinidad",
    company: "Michael Skins United",
    phone: "3109221824",
  },
  {
    name: "MoneyMan Krabs",
    company: "Crab Skins United",
    phone: "3109221824",
  },
];

export default function Clients({ navigation }) {
  const [clientsArray, setClientsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllClients = async () => {
    setIsLoading(true);
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.listClients));
    } catch (err) {
      console.log("error getting clients", err);
    }
    setClientsArray(response.data.listClients.items);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   getAllClients();
  // }, []);

  const renderClient = ({ item }) => (
    <EachClient
      onPress={() => navigation.navigate("ClientDetails").bind(item.id)}
      name={item.name}
      phone={item.phone}
      company={item.company}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Clients</Text>
        <Ionicons
          style={styles.add}
          name="person-add-outline"
          size={23}
          color="black"
          onPress={() => navigation.navigate("AddClient")}
        />
      </View>
      <View style={styles.list}>
        <FlatList
          data={DATA}
          renderItem={renderClient}
          keyExtractor={(c) => c.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flex: 0.0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#c9c9c9",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  add: {
    position: "absolute",
    right: 20,
  },
  list: {
    flex: 1,
  },
});
