import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TaskContext } from "../../context/task-context";
import EachTask from "../../components/EachTask";
import useClient from "../../hooks/client-hook";
import { parseISO, format, formatDistanceToNowStrict } from "date-fns";

export default function Home() {
  const [reminders, setReminders] = useState([]);
  const { tasksArray } = useContext(TaskContext);
  const { getAllReminders } = useClient();

  const getReminders = async () => {
    let response = await getAllReminders();
    if (response) {
      let newResponse = response.data.listReminders.items;
      const sortedResponse = newResponse.sort((a, b) => a.date - b.date);
      setReminders(sortedResponse);
    }
  };

  useEffect(() => {
    getReminders();
  }, []);

  return (
    <View style={styles.container}>
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
            <Text style={styles.titleHeader}>REMINDERS</Text>
          </View>
          <ScrollView styles={styles.remindersScrollContainer}>
            {reminders.map((item) => (
              <View style={styles.reminder} key={item.id}>
                <Text style={styles.reminderClientName}>
                  {item.client.name}
                </Text>
                <Text style={styles.reminderClientCompany}>
                  {item.client.company}
                </Text>
                <Text>
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
  reminderClientCompany: {
    fontSize: 12,
    color: "#ababab",
  },
});
