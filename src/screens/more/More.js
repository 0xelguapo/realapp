import { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../context/auth-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as mutations from '../../graphql/mutations'

export default function More() {
  const [notesArray, setNotesArray] = useState([])
  const { signOut } = useContext(AuthContext);

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
        <Text style={styles.headingText}>NOTES</Text>
      </View>
      <Button title="Sign Out" color="red" onPress={signOut} />
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
    flexDirection: 'row',
  },
  headingText: {
    fontSize: 20,
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
});
