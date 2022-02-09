import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  Button,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

export default function Clients({ navigation }) {
  const [clientsArray, setClientsArray] = useState([])
  
  const getAllClients = async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.listClients));
    } catch (err) {
      console.log("error getting clients", err);
    }
    console.log(response.data.listClients.items)
    setClientsArray(response.data.listClients.items)
  };

  useEffect(() => {
    getAllClients();
  }, []);

  return (
    <View>
      <Button
        title="Add Client"
        onPress={() => navigation.navigate("AddClient")}
      />
      <Text>Clients</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});
