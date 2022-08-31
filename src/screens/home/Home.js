import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { TaskContext } from "../../context/task-context";
import EachTask from "../../components/EachTask";
import useClient from "../../hooks/client-hook";
import {
  parseISO,
  format,
  formatDistanceToNowStrict,
  differenceInCalendarDays,
} from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const [reminders, setReminders] = useState([]);
  const [refreshVisible, setRefreshVisible] = useState(true);
  const { tasksArray } = useContext(TaskContext);
  const { getAllReminders } = useClient();

  const getReminders = async () => {
    let response = await getAllReminders();
    let dateHelper = new Date();
    if (response) {
      let newResponse = response.data.listReminders.items;
      let filteredResponse = newResponse.filter((el) => {
        const result = differenceInCalendarDays(parseISO(el.date), dateHelper);
        if (result <= 3) return true;
        else return false;
      });
      const sortedResponse = filteredResponse.sort((a, b) => a.date - b.date);
      setReminders(sortedResponse);
    }
    console.log('gettingReminders')
  };

  const handleManualRefresh = () => {
    setRefreshVisible(false);
    setTimeout(() => {
      setRefreshVisible(true);
    }, 2000);
    getReminders();
  };

  useEffect(() => {
    getReminders();
  }, []);

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
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Focus</Text>
      </View>
      <View style={styles.bodyContainer}>
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
        <View style={styles.remindersContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>UPCOMING REMINDERS</Text>
          </View>
          <ScrollView styles={styles.remindersScrollContainer}>
            {reminders.map((item) => (
              <View style={styles.reminder} key={item.id}>
                <Text style={styles.reminderClientName}>
                  {item.client.name}
                </Text>
                <Text style={styles.reminderDate}>
                  {formatDistanceToNowStrict(parseISO(item.date), {
                    addSuffix: true,
                  })}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
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
  remindersContainer: {},
  reminder: {
    paddingVertical: 5,
    justifyContent: "center",
  },
  reminderClientName: {
    fontWeight: "500",
    fontSize: 16,
    color: "#454545",
  },
  reminderDate: {
    fontSize: 12,
    color: "#ababab",
  },
});
