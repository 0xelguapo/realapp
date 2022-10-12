import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import EachClient from "../../components/client/EachClient";
import { useSelector, useDispatch } from "react-redux";
import {
  selectGroupById,
  deleteGroup,
  removeMultipleClientsFromGroup,
} from "../../redux/groups-slice";

export default function ViewOneGroup(props) {
  const { groupID, groupTitle } = props.route.params;
  const dispatch = useDispatch();
  const thisGroup = useSelector((state) => selectGroupById(state, groupID));

  const handleViewClient = (client) => {
    props.navigation.navigate("ClientDetails", {
      client: client,
      groupMode: true,
    });
  };

  const handleEditGroup = () => {
    props.navigation.navigate("EditClientsOfGroup", {
      groupID: groupID,
      groupTitle: thisGroup.title,
    });
  };

  const handleDeleteGroup = () => {
    Alert.alert(
      "Are you sure you want to delete this group? This action cannot be undone",
      null,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (thisGroup.clients.items.length === 0) {
              props.navigation.goBack();
              dispatch(deleteGroup(groupID));
            } else {
              const allClientsToBeRemoved = thisGroup.clients.items.map(
                (el) => el.id
              );
              props.navigation.goBack();
              dispatch(
                removeMultipleClientsFromGroup({
                  removeIDs: allClientsToBeRemoved,
                  groupID: groupID,
                })
              ).then(() => dispatch(deleteGroup(groupID)));
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}></View>
        </View>
        <Text style={styles.headerText}>{thisGroup.title}</Text>
        <View style={styles.clientGroupDetails}>
          <Text>
            {thisGroup.clients.items.length !== 0 ? (
              <Text style={styles.clientsLength}>
                {thisGroup.clients.items.length}
              </Text>
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
          <Text style={styles.editText}>EDIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.editButton,
            borderLeftWidth: 1,
            borderLeftColor: "#e6e6e6",
          }}
          onPress={handleDeleteGroup}
        >
          <Ionicons name="remove-circle-outline" size={24} color="#535353" />
          <Text style={styles.editText}>DELETE</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.clientsContainer}>
        {thisGroup.clients.items.map((client) => (
          <EachClient
            taskMode={true}
            key={client.client.id}
            phone={client.client.phone}
            firstName={client.client.firstName}
            lastName={client.client.lastName}
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
    flexDirection: "row",
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
    flex: 1,
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
