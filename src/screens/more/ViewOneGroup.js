import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { getClientGroupWithClientDetails } from "../../graphql/customQueries";
import { Ionicons, Feather } from "@expo/vector-icons";
import EachClient from "../../components/client/EachClient";
import { GroupsContext } from "../../context/group-context";

export default function ViewOneGroup(props) {
  const { clientsOfGroup, getClientsFromOneGroup } = useContext(GroupsContext);
  const { groupID, groupTitle } = props.route.params;

  const handleViewClient = (client) => {
    props.navigation.navigate("ClientDetails", {
      client: client,
      groupMode: true,
    });
  };

  const handleEditGroup = () => {
    props.navigation.navigate("EditClientsOfGroup", {
      groupID: groupID,
      groupTitle: groupTitle
    });
  };

  useEffect(() => {
    getClientsFromOneGroup(groupID);
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
            {clientsOfGroup.length !== 0 ? (
              <Text style={styles.clientsLength}>{clientsOfGroup.length}</Text>
            ) : (
              <Text style={styles.clientsLength}>0</Text>
            )}
          </Text>
          <Ionicons name="ios-people-outline" size={12} color="#535353" />
        </View>
      </View>
      <View style={styles.editContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditGroup}>
          <Feather name="edit-2" size={20} color="#535353" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.clientsContainer}>
        {clientsOfGroup.map((client) => (
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
  editContainer: {
    height: 65,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  editButton: {
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 60,
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
