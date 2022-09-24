import { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import useClient from "../../hooks/client-hook";
import Group from "../../components/more/Group";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGroups,
  addGroup,
  selectAllGroups,
} from "../../redux/group-slice";

export default function ViewGroups(props) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const groups = useSelector(selectAllGroups);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleSubmit = async () => {
    dispatch(addGroup(title));
    setTitle("");
    setShowInput(false);
  };

  useEffect(() => {
    if (showInput) inputRef.current.focus();
  }, [showInput]);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={props.navigation.goBack}
        >
          <AntDesign name="left" size={24} color="#ababab" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>All Groups</Text>
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
        <ScrollView
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 100 }}
        >
          {groups.map((el) => (
            <Group key={el.id} el={el} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 65,
    paddingBottom: 40,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  backButtonContainer: { position: "absolute", left: 0 },
  screenTitle: {
    fontWeight: "500",
    fontSize: 20,
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
  clientGroupsContainer: {},
});
