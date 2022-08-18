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

export default function AddEditGroup(props) {
  const { clientId, index } = props.route.params;
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [clientGroups, setClientGroups] = useState([]);
  const { addGroupAndClient, getAllGroups } = useClient();

  const getClientGroups = async () => {
    const response = await getAllGroups();
    let clientGroupsArray = response.data.listClientGroups.items;
    setClientGroups(clientGroupsArray);
  };

  useEffect(() => {
    getClientGroups();
  }, []);

  const handleSubmit = async () => {
    const response = await addGroupAndClient(title, clientId);
    console.log(response);
    if (response) {
      await getClientGroups();
    }
  };

  console.log(clientGroups)
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
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
        {showInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              returnKeyType="done"
              onChangeText={setTitle}
              onEndEditing={handleSubmit}
            />
          </View>
        )}
        <View style={styles.clientGroupsContainer}>
          {clientGroups.map((el) => (
            <View style={styles.clientGroup} key={el.id}>
              <Text style={styles.clientGroupTitle}>{el.title}</Text>
            </View>
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
  clientGroup: {
    paddingHorizontal: 15,
    borderWidth: 0.8,
    height: 45,
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  clientGroupTitle: {
    fontWeight: "600",
  },
});
