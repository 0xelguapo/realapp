import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import useClient from "../../hooks/client-hook";
import ClientGroup from "../../components/ClientGroup";

export default function AddEditGroup(props) {
  const { clientId, index } = props.route.params;
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const [thisClientsGroups, setThisClientsGroups] = useState([]);
  const inputRef = useRef(null);
  const { addGroup, getAllGroups, getClientGroups } = useClient();

  const updateClientGroups = (allGroups, clientsGroups) => {
    let allGroupsCopy = allGroups.slice(0);
    for (let i = 0; i < allGroupsCopy.length; i++) {
      const allGroupsId = allGroupsCopy[i].id;
      for (let j = 0; j < clientsGroups.length; j++) {
        console.log(clientsGroups)
        if (allGroupsId === clientsGroups[j].clientGroupID) {
          allGroupsCopy[i] = {
            ...allGroupsCopy[i],
            inGroup: true,
            clientGroupID: clientsGroups[j].id
          };
        }
      }
    }
    console.log(allGroupsCopy)
    return allGroupsCopy;
  };

  const getAllGroupsAndUpdate = async () => {
    const allGroupsResponse = await getAllGroups();
    let allGroupsArray = allGroupsResponse.data.listClientGroups.items;
    const clientsGroupsResponse = await getClientGroups(clientId);
    let clientsGroupsArray = clientsGroupsResponse.data.getClient.group.items;
    if (allGroupsArray && clientsGroupsArray) {
      let finalArray = updateClientGroups(allGroupsArray, clientsGroupsArray);
      setAllGroups(finalArray);
    }
  };

  useEffect(() => {
    getAllGroupsAndUpdate();
  }, []);

  useEffect(() => {
    if (allGroups.length !== 0 && thisClientsGroups.length !== 0) {
      updateClientGroups(allGroups, thisClientsGroups);
    }
  }, []);

  useEffect(() => {
    if (showInput) inputRef.current.focus();
  }, [showInput]);

  const handleSubmit = async () => {
    const response = await addGroup(title);
    console.log(response);
    if (response) {
      await getGroups();
      setTitle("");
      setShowInput(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.screenTitle}>Add to Group</Text>
        <TouchableOpacity onPress={props.navigation.goBack}>
          <AntDesign name="close" size={24} color="#ababab" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowInput(!showInput)}
        >
          <Text style={styles.createButtonText}>Create a New Group</Text>
          {showInput ? (
            <AntDesign name="minus" size={24} color="black" />
          ) : (
            <Ionicons name="add" size={24} color="black" />
          )}
        </TouchableOpacity>
        {showInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              returnKeyType="done"
              onChangeText={setTitle}
              onSubmitEditing={handleSubmit}
              ref={inputRef}
              value={title}
            />
          </View>
        )}
        <View style={styles.clientGroupsContainer}>
          {allGroups.map((el) => (
            <ClientGroup key={el.id} el={el} clientId={clientId} clientGroupID={el.clientGroupID} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  screenTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  body: {
    paddingVertical: 30,
  },
  createButton: {
    backgroundColor: "#D9D9D9",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    display: "flex",
    paddingVertical: 10,
  },
  input: {
    height: 35,
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    borderColor: "#454545",
  },
  clientGroupsContainer: {
    paddingVertical: 10,
  },
});
