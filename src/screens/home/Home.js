import { useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TaskContext } from "../../context/task-context";
import { ClientsContext } from "../../context/client-context";

export default function Home() {
  const { tasksArray } = useContext(TaskContext);
  const { clientsArray } = useContext(ClientsContext);

  console.log(tasksArray)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Focus</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.taskTitleContainer}>
          <Text style={styles.headerTasks}>TASKS</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.08,
    paddingTop: 55,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: "#454545",
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  taskTitleContainer: {
    borderBottomColor: '#ababab',
    borderBottomWidth: .2,
    paddingBottom: 5
  },
  headerTasks: {
    fontSize: 15,
    fontWeight: "300",
    color: "#ababab",
    letterSpacing: "1.2rem",
  },
});
