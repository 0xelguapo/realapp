import { View, Text, StyleSheet } from "react-native";
import HomeTask from "./HomeTask";

export default function TaskList({ tasksOfDate, handleCompleteTask }) {
  return (
    <>
      {tasksOfDate.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks for today!</Text>
          <Text style={styles.emptySubtext}>
            Click the + button to start planning...
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.tasksContainer}>
            {tasksOfDate.map((task, index) => {
              if (!task.completed)
                return (
                  <HomeTask
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    index={index}
                    completed={task.completed}
                    content={task.content}
                    length={tasksOfDate.length}
                    date={task.date}
                    clientId={task.clientId}
                    onPress={() => handleCompleteTask(task.id, task.completed)}
                  />
                );
            })}
          </View>
          <View style={styles.completedTasksContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleHeader}>COMPLETED</Text>
            </View>
            {tasksOfDate.map((task, index) => {
              if (task.completed)
                return (
                  <HomeTask
                    key={task.id}
                    title={task.title}
                    index={index}
                    completed={task.completed}
                    content={task.content}
                    length={tasksOfDate.length}
                    date={task.date}
                    onPress={() => handleCompleteTask(task.id, task.completed)}
                  />
                );
            })}
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    marginBottom: 10,
    flex: 1,
  },
  emptyContainer: {
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ababab",
  },
  emptySubtext: {
    fontWeight: "300",
    color: "#ababab",
  },
  titleHeader: {
    fontSize: 12,
    fontWeight: "300",
    color: "#ababab",
    letterSpacing: 2,
  },
});
