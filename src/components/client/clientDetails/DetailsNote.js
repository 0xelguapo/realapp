import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsNote({ clientDetailsState, viewNoteHandler }) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.blockHeadingContainer}>
        <Text style={styles.blockHeadingText}>NOTE</Text>
        <Pressable onPress={viewNoteHandler}>
          <Ionicons name="add-circle-outline" size={20} color="#ababab" />
        </Pressable>
      </View>
      <View style={styles.detailContainer}>
        {clientDetailsState.notes ? (
          <Text style={styles.notesText}>{clientDetailsState.notes}</Text>
        ) : (
          <Text style={styles.emptyPlaceholder}>Add a note here...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blockHeadingText: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 12,
    paddingVertical: 5,
  },
  blockHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    borderBottomColor: "#ababab",
  },
  detailsContainer: {
    paddingVertical: 5,
    borderColor: "#000000",
    minHeight: 75,
  },
  detailContainer: {
    display: "flex",
    paddingVertical: 3,
  },
  notesContainer: {
    paddingVertical: 5,
  },
  notesText: {
    color: "#6c6c6c",
  },
  emptyPlaceholderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyPlaceholder: {
    color: "#ababab",
  },
});
