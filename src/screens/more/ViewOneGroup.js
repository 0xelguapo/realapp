import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getClientGroupWithClientDetails } from "../../graphql/customQueries";
import { Ionicons } from "@expo/vector-icons";
import EachClient from "../../components/client/EachClient";

export default function ViewOneGroup(props) {
  const [clients, setClients] = useState([]);
  const { groupID, groupTitle } = props.route.params;

  const getClientsFromGroup = async () => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(getClientGroupWithClientDetails, {
          id: groupID,
        })
      );
    } catch (err) {
      console.error(err);
    }
    console.log(response);
    const { items: clientsArray } = response.data.getClientGroup.clients;
    setClients(clientsArray);
    console.log(clientsArray);
    return response;
  };

  const handleViewClient = (client) => {
    props.navigation.navigate("ClientDetails", {
      client: client,
    });
  };

  useEffect(() => {
    getClientsFromGroup();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}></View>
        </View>
        <Text style={styles.headerText}>{groupTitle}</Text>
        <View style={styles.clientGroupDetails}>
          <Text>
            {clients.length !== 0 ? (
              <Text style={styles.clientsLength}>{clients.length}</Text>
            ) : (
              <Text style={styles.clientsLength}>0</Text>
            )}
          </Text>
          <Ionicons name="ios-people-outline" size={12} color="#535353" />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.clientsContainer}>
        {clients.map((client) => (
          <EachClient
            taskMode={true}
            key={client.client.id}
            phone={client.client.phone}
            name={client.client.name}
            company={client.client.company}
            onPress={() => handleViewClient(client.client)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  headingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ababab",
  },
  rectangleContainer: {
    display: "flex",
    position: "",
    alignItems: "center",
    height: 25,
    width: "100%",
    marginBottom: 15,
  },
  rectangle: {
    justifyContent: "center",
    width: 75,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#c7c7c7",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#454545",
    marginBottom: 5,
  },
  clientGroupDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 22,
  },
  clientGroupTitle: {
    fontWeight: "600",
    marginBottom: 3,
  },
  clientsLength: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
  },
  clientsContainer: {
    paddingHorizontal: 20,
  },
});
