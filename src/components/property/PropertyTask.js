import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { formatDistanceToNowStrict, parseISO, format } from "date-fns";
import { AntDesign } from "@expo/vector-icons";

export default function PropertyTask({
  title,
  description,
  date,
  checkState,
  handlePress,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
        {checkState ? (
          <AntDesign name="checkcircle" size={15} color="#7b7b7c" />
        ) : (
          <View style={styles.circle} />
        )}
        {/* <AntDesign name="check" size={20} color="#6c6c6c" /> */}
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Text style={styles.taskTitle}>{title}</Text>
        {description.length > 0 && (
          <Text style={styles.description}>{description}</Text>
        )}
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
    backgroundColor: "white",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 30,
  },
  detailsContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    height: "auto",
    minHeight: 60,
    paddingVertical: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: "#6c6c6c",
  },
  dateText: {
    fontSize: 12,
    marginTop: 5,
    color: "#6c6c6c",
  },
  buttonContainer: {
    width: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circle: {
    width: 15,
    height: 15,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: "#7b7b7c",
  },
});
