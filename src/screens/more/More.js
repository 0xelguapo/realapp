import { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { AuthContext } from "../../context/auth-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as queries from "../../graphql/queries";
import Note from "../../components/Note";

export default function More(props) {
  const [notesArray, setNotesArray] = useState([]);
  const { signOut } = useContext(AuthContext);

  const fetchNotes = async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.listNotes));
    } catch (err) {
      console.error(err);
    }
    setNotesArray(response.data.listNotes.items);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = () => {
    props.navigation.navigate("AddNote");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>EXTRAS</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Feather name="bell" size={24} color="#535353" />
          <Text style={styles.optionText}>Reminders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="people-outline" size={24} color="#535353" />
          <Text style={styles.optionText}>Groups</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>QUICK NOTES</Text>
        <Ionicons name="add" size={28} color="black" onPress={handleAddNote} />
      </View>
      <ScrollView style={styles.notesContainer}>
        {notesArray.map((note) => (
          <Note title={note.title} content={note.content} key={note.id} />
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
  },
  headingText: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 2,
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
