import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";

export default function HomeReminder({ reminder, onPress }) {
  
  return (
    <Swipeable>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {reminder.client.firstName + " " + reminder.client?.lastName}
          </Text>
          <Text style={styles.content}>{reminder.freq}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Feather name="bell" size={15} color="#535353" />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 25,
    minHeight: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },
  textContainer: {
    display: "flex",
    flex: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 17,
    color: "#454545",
  },
  content: {
    fontSize: 14,
    color: "#6c6c6c",
  },
  time: {
    color: "#6c6c6c",
    marginTop: 3,
  },
});
