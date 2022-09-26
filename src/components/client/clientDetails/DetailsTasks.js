import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsTasks({ clientDetailsState, viewTaskHandler }) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.blockHeadingContainer}>
        <Text style={styles.blockHeadingText}>TASKS</Text>
        <Pressable onPress={viewTaskHandler}>
          <Ionicons name="add-circle-outline" size={20} color="#ababab" />
        </Pressable>
      </View>
      <View style={styles.detailContainer}>
        {clientDetailsState.tasks?.items &&
          clientDetailsState.tasks.items.map((el) => (
            <View style={styles.taskContainer} key={el.id}>
              <Text style={styles.connectionTitle}>{el.title}</Text>
              <Text style={styles.connectionDate}>{el.content}</Text>
            </View>
          ))}
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
  connection: {
    paddingVertical: 5,
  },
  connectionTitle: {
    fontWeight: "500",
    fontSize: 15,
    color: "#6c6c6c",
  },
  connectionDate: {
    color: "#ababab",
    fontSize: 14,
  },
});
