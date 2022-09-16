import { useState, useEffect, useRef, useContext } from "react";
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
import Group from "../../components/more/Group";
import { GroupsContext } from "../../context/group-context";

export default function ViewGroups(props) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  // const [allGroups, setAllGroups] = useState([]);
  const inputRef = useRef(null);
  const { addGroup } = useClient();
  const { allGroups, getAllGroups } = useContext(GroupsContext);

  const handleSubmit = async () => {
    const response = await addGroup(title);
    if (response) {
      await getAllGroups();
      setTitle("");
      setShowInput(false);
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  useEffect(() => {
    if (showInput) inputRef.current.focus();
  }, [showInput]);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.screenTitle}>All Groups</Text>
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
            <Group key={el.id} el={el} />
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
