import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import * as queries from "../../graphql/queries";
import Note from "../../components/more/Note";

export default function More(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [notesArray, setNotesArray] = useState([]);

  const fetchNotes = async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.listNotes));
    } catch (err) {
      console.error(err);
    }
    setNotesArray(response.data.listNotes.items);
  };

  const deleteNoteFromNotesArray = (index) => {
    let currentNotesArray = [...notesArray];
    currentNotesArray.splice(index, 1);
    setNotesArray(currentNotesArray);
  };

  useEffect(() => {
    fetchNotes();
  }, [props.route.params]);

  const handleNavigateSettings = () => {
    setModalVisible(false)
    props.navigation.navigate('Settings')
  }

  const handleAddNote = () => {
    props.navigation.navigate("AddNote");
  };

  const handleViewGroups = () => {
    props.navigation.navigate("ViewAllGroups");
  };

  const handleViewReminders = () => {
    props.navigation.navigate("ViewAllReminders");
  };

  return (
    <View style={styles.container}>
      {modalVisible && (
        <Pressable
          style={[StyleSheet.absoluteFill, { zIndex: 3 }]}
          onPress={() => setModalVisible(false)}
        />
      )}
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>EXTRAS</Text>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <SimpleLineIcons name="options" size={24} color="#dddddf" />
        </TouchableOpacity>
        {modalVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuOption} onPress={handleNavigateSettings}>
              <Text style={styles.menuOptionText}>Settings</Text>
              <Ionicons name="exit-outline" size={24} color="#333333" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={handleViewReminders}>
          <Feather name="bell" size={24} color="#535353" />
          <Text style={styles.optionText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleViewGroups}>
          <Ionicons name="people-outline" size={24} color="#535353" />
          <Text style={styles.optionText}>Groups</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>QUICK NOTES</Text>
        <TouchableOpacity onPress={handleAddNote}>
          <Ionicons name="add" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.notesContainer}>
        {notesArray.map((note, index) => (
          <Note
            title={note.title}
            content={note.content}
            key={note.id}
            id={note.id}
            index={index}
            deleteNoteFromNotesArray={deleteNoteFromNotesArray}
          />
        ))}
      </ScrollView>
      {/* <Button title="Sign Out" color="red" onPress={signOut} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 35,
    flex: 1,
  },
  headingContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 3,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 2,
  },
  menuContainer: {
    position: "absolute",
    right: 20,
    bottom: -20,
    backgroundColor: "#f6f6f6",
    width: 210,
    zIndex: 10,
    borderRadius: 10,
    shadowRadius: 4,
    shadowColor: "rgba(34, 34, 34, 0.58)",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 4,
    },
  },
  menuOption: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.2,
    borderBottomColor: "#e7e7e7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuOptionText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#333333",
  },

  optionsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  option: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#e6e6e6",
    flex: 0.8,
    marginRight: 10,
    height: 100,
  },
  optionText: {
    fontWeight: "500",
    fontSize: 14,
    marginTop: 5,
  },
  notesContainer: {
    display: "flex",
    height: "60%",
  },
});
