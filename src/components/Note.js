import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Note(props) {
  return (
    <View style={styles.noteContainer}>
      <View style={styles.noteInfo}>
        <Text style={styles.noteTitle}>{props.title}</Text>
        {props.content.length !== 0 && (
          <Text style={styles.noteContent}>{props.content}</Text>
        )}
      </View>
      <View style={styles.deleteContainer}>
        <Ionicons name="remove-circle-outline" size={20} color="#535353" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 7,
    borderRadius: 5,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  noteContent: {
    fontSize: 14,
  },
  deleteContainer: {}
});
