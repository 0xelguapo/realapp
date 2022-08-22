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
  const [clientGroups, setClientGroups] = useState([]);
  const [groupsWithClients, setGroupsWithClients] = useState([])
  const inputRef = useRef(null);
  const { addGroup, getAllGroups, listGroupedClients } = useClient();

  const getClientGroups = async () => {
    const response = await getAllGroups();
    let clientGroupsArray = response.data.listClientGroups.items;
    setClientGroups(clientGroupsArray);
    console.log(clientGroupsArray);
  };

  const getGroupsWithClients = async () => {
    let response = await listGroupedClients();
    if(response) {
      setGroupsWithClients(response.data.listGroupsClients.items)
      // console.log(groupsWithClients)
    }
  };


  //get all client groups
  //get all groups with clients
  //iterate through the client groups, check where the id of client groups matches the id of groups clients
  //if it matches, update the group

  const updateGroups = () => {
    const allGroupsCopy = clientGroups.slice(0);
    const groupsWithClientsCopy = groupsWithClients.slice(0)
    // get the all groups array as a parameter
    // get the array of groups with clients as a parameter
    // go through the array of groupsWithClients, check if ID matches the id of groups array
    // if it does, replace the item in all groups array with this new item
    // once replaced, move onto next item in groupsWithClients
    // when done, set the updated array to a state
    // map this state out in UI
    for(let i = 0; i < groupsWithClientsCopy.length; i++) {
      for(let j = 0; j < allGroupsCopy.length; j++) {
        if(groupsWithClientsCopy[i].clientGroupID === allGroupsCopy[j].id) {
          allGroupsCopy[j] = groupsWithClientsCopy[i]
          continue;
        }
      }
    }
    // console.log('--------copy-----')
    // console.log(allGroupsCopy)
    // setClientGroups(allGroupsCopy)
  };

 
  useEffect(() => {
    getGroupsWithClients();
  }, []);

  useEffect(() => {
    getClientGroups();
  }, []);

  useEffect(() => {
    updateGroups()
  }, [])

  useEffect(() => {
    if (showInput) inputRef.current.focus();
  }, [showInput]);

  const handleSubmit = async () => {
    const response = await addGroup(title);
    console.log(response);
    if (response) {
      await getClientGroups();
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
          {clientGroups.map((el) => (
            <ClientGroup key={el.id} el={el} clientId={clientId} />
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
