import { View, Text, StyleSheet } from "react-native";

export default function PropertyTask({ title, description, date }) {
  return (
    <View style={styles.container}>
      <Text style={styles.taskTitle}>{title}</Text>
      {description.length > 0 && <Text style={styles.description}>{description}</Text>}
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
    paddingHorizontal: 30,
    minHeight: 60,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  dateText: {
    fontSize: 12
  }
});
