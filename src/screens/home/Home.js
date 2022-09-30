import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AddHome from "../../components/home/AddHome";
import EachTask from "../../components/EachTask";
import { useDispatch } from "react-redux";
import { TaskContext } from "../../context/task-context";
import { MaterialIcons } from "@expo/vector-icons";
import RemindersList from "../../components/home/RemindersList";
import { fetchReminders } from "../../redux/reminders-slice";

export default function Home(props) {
  const [refreshVisible, setRefreshVisible] = useState(true);
  const { tasksArray, fetchTasks } = useContext(TaskContext);

  const dispatch = useDispatch();

  const handleManualRefresh = () => {
    setRefreshVisible(false);
    setTimeout(() => {
      setRefreshVisible(true);
    }, 2000);
    fetchTasks();
    dispatch(fetchReminders());
  };

  return (
    <View style={styles.container}>
      {refreshVisible && (
        <TouchableOpacity
          style={styles.refreshContainer}
          onPress={handleManualRefresh}
        >
          <MaterialIcons name="refresh" size={20} color="#454545" />
        </TouchableOpacity>
      )}
      <AddHome />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Focus</Text>
      </View>
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.remindersContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>UPCOMING REMINDERS</Text>
          </View>
          <RemindersList homeMode={true} />
        </View>
        <View style={styles.tasksContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>TASKS</Text>
          </View>
          {tasksArray.map((task) => (
            <EachTask
              key={task.id}
              id={task.id}
              title={task.title}
              content={task.content}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  refreshContainer: {
    position: "absolute",
    right: 30,
    top: 55,
    zIndex: 3,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleContainer: {
    borderBottomColor: "#ababab",
    borderBottomWidth: 0.2,
    paddingBottom: 5,
  },
  titleHeader: {
    fontSize: 12,
    fontWeight: "300",
    color: "#ababab",
    letterSpacing: 2,
  },
  tasksContainer: { marginBottom: 10 },
  remindersContainer: {
    marginBottom: 10,
    paddingVertical: 5,
  },
  placeholder: {
    color: "#ababab",
    paddingVertical: 5,
  },
});
