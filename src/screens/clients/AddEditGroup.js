import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ClientGroup from "../../components/client/ClientGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllGroups,
  fetchGroups,
  addGroup,
} from "../../redux/groups-slice";
import { selectClientById } from "../../redux/clients-slice";

export default function AddEditGroup(props) {
  const { clientId, index } = props.route.params;
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const groups = useSelector(selectAllGroups);

  const clientsGroups = useSelector((state) =>
    selectClientById(state, clientId)
  ).group.items;

  const updateClientGroups = (allGroups, clientsGroups) => {
    let allGroupsCopy = [...allGroups];
    for (let i = 0; i < allGroupsCopy.length; i++) {
      const allGroupsId = allGroupsCopy[i].id;
      for (let j = 0; j < clientsGroups.length; j++) {
        if (allGroupsId === clientsGroups[j].clientGroupID) {
          allGroupsCopy[i] = {
            ...allGroupsCopy[i],
            inGroup: true,
            clientGroupID: clientsGroups[j].id,
          };
        }
      }
    }
    return allGroupsCopy;
  };

  const getAllGroupsAndUpdate = async () => {
    dispatch(fetchGroups());
    let finalArray = updateClientGroups(groups, clientsGroups);
    setAllGroups(finalArray);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getAllGroupsAndUpdate();
    return () => (isMounted = false);
  }, [groups, clientsGroups, dispatch]);

  useEffect(() => {
    if (showInput) inputRef.current.focus();
  }, [showInput]);

  const handleSubmit = async () => {
    if (title) {
      dispatch(addGroup(title));
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
      <ScrollView contentContainerStyle={[{paddingBottom: 70, paddingHorizontal: 30}]}>
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
            <ClientGroup
              key={el.id}
              el={el}
              clientId={clientId}
              clientGroupID={el.clientGroupID}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
    backgroundColor: "#f9f9f9"
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 20,
    alignItems: 'center'
  },
  screenTitle: {
    fontWeight: "500",
    fontSize: 18,
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
