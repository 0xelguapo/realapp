import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TaskContext } from "../../context/task-context";
import EachTask from "../../components/EachTask";

export default function Home() {
  const { tasksArray } = useContext(TaskContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Focus</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.taskTitleContainer}>
          <Text style={styles.headerTasks}>TASKS</Text>
        </View>
        <View style={styles.tasksContainer}>
          {tasksArray.map(task => <EachTask key={task.id} title={task.title} content={task.content} />)}
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
    paddingTop: 40,
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
    paddingVertical: 10,
  },
  taskTitleContainer: {
    borderBottomColor: '#ababab',
    borderBottomWidth: .2,
    paddingBottom: 5
  },
  headerTasks: {
    fontSize: 12,
    fontWeight: "300",
    color: "#ababab",
    letterSpacing: 2
  },
});
