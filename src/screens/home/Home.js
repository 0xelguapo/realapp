import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchReminders } from "../../redux/reminders-slice";
import {
  completeTask,
  fetchTasks,
  selectAllTasks,
} from "../../redux/tasks-slice";
import AddHome from "../../components/home/AddHome";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Purchases from "react-native-purchases";
import { ENTITLEMENT_ID } from "../../constants";
import {
  format,
  add,
  sub,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import HomeTask from "../../components/home/HomeTask";
import { API, graphqlOperation } from "aws-amplify";
import { getUserStreak, updateUserStreak } from "../../graphql/customQueries";
import { AuthContext } from "../../context/auth-context";

let isMounted = false;

export default function Home(props) {
  let date = new Date();
  const { user } = useContext(AuthContext);
  const [refreshVisible, setRefreshVisible] = useState(true);
  const [streakCount, setStreakCount] = useState(0);
  const [streakDate, setStreakDate] = useState(new Date());
  const [nextFiveDates, setNextFiveDates] = useState([
    sub(new Date(), { days: 1 }),
    date,
    add(new Date(), { days: 1 }),
    add(new Date(), { days: 2 }),
    add(new Date(), { days: 3 }),
    add(new Date(), { days: 4 }),
  ]);
  const [activeDate, setActiveDate] = useState(nextFiveDates[1]);
  const allTasks = useSelector(selectAllTasks);
  const tasksOfDate = allTasks
    .filter((task) => {
      if (task.date.length > 1) {
        return (
          format(new Date(task.date), "L, d") === format(activeDate, "L, d")
        );
      } else if (task.date.length < 1) {
        return true;
      }
    })
    .sort((a, b) => {
      if (b.date.length < 1) return 2;
      else return new Date(a.date) - new Date(b.date);
    });

  const lengthOfCompletedTasks = tasksOfDate.reduce(
    (acc, el) => {
      if (el.completed) acc++;
      return acc;
    },
    [0]
  );

  const lengthOfOverdueTasks = allTasks.reduce(
    (acc, el) => {
      if (
        format(new Date(el.date), "L, d") < format(date, "L, d") &&
        !el.completed
      )
        acc++;
      return acc;
    },
    [0]
  );

  const displayPaywall = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      if (
        typeof customerInfo.entitlements.active[ENTITLEMENT_ID] === "undefined"
      ) {
        props.navigation.navigate("Paywall");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let streakResponse;
    let streakDate;

    const getStreak = async () => {
      streakResponse = await API.graphql(
        graphqlOperation(getUserStreak, { id: user.attributes.sub })
      );
      setStreakCount(parseInt(streakResponse.data.getUser.streakCount));
      streakDate = new Date(streakResponse.data.getUser.streakDate);
      setStreakDate(streakDate);
      return streakResponse.data.getUser;
    };
    getStreak();
  }, []);

  useEffect(() => {
    const incrementStreak = async () => {
      await API.graphql(
        graphqlOperation(updateUserStreak, {
          input: {
            id: user.attributes.sub,
            streakCount: (streakCount + 1).toString(),
            streakDate: new Date(),
          },
        })
      );
    };

    const diffDays = Math.floor(
      (new Date() - streakDate) / (1000 * 60 * 60 * 24)
    );

    const lastUpdated = formatDistanceToNowStrict(streakDate, {
      unit: "day",
      addSuffix: false,
    });

    if (
      tasksOfDate.length > 0 &&
      tasksOfDate.length - lengthOfCompletedTasks === 0 &&
      diffDays < 2 &&
      lastUpdated !== "0 days"
    ) {
      incrementStreak();
      setStreakCount((prev) => prev++);
    }
  }, [lengthOfCompletedTasks]);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchReminders());
  }, []);

  useEffect(() => {
    displayPaywall();
  }, []);

  const dispatch = useDispatch();

  const handleManualRefresh = () => {
    setRefreshVisible(false);
    setTimeout(() => {
      setRefreshVisible(true);
    }, 2000);
    dispatch(fetchTasks());
    dispatch(fetchReminders());
  };

  const handleCompleteTask = async (id, completed) => {
    const response = await dispatch(
      completeTask({ id, completed: !completed })
    ).unwrap();
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

      <ScrollView
        style={styles.bodyContainer}
        contentContainerStyle={[{ paddingBottom: 50 }]}
      >
        <View style={styles.datesContainer}>
          {nextFiveDates.map((d, index) => {
            return (
              <Pressable
                style={
                  activeDate === d
                    ? styles.activeIndividualDate
                    : styles.individualDate
                }
                key={index}
                onPress={() => setActiveDate(nextFiveDates[index])}
              >
                <Text
                  style={
                    activeDate === d ? styles.activeDayOfWeek : styles.dayOfWeek
                  }
                >
                  {format(d, "EEEEEE").toUpperCase()}
                </Text>
                <Text
                  style={
                    activeDate === d
                      ? styles.activeDayOfMonth
                      : styles.dayOfMonth
                  }
                >
                  {format(d, "d")}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBoxContainer}>
            <View style={styles.progressBox}>
              <View style={styles.progressTitleContainer}>
                <Text style={styles.progressTextTitle}>Today's Progress</Text>
              </View>
              <View style={styles.progressRatioContainer}>
                <Text style={styles.progressRatio}>
                  {lengthOfCompletedTasks || "0"}/{tasksOfDate?.length || "0"}
                </Text>
              </View>
              <View style={styles.progressSubtextContainer}>
                <Text style={styles.progressSubtext}>
                  {tasksOfDate?.length - lengthOfCompletedTasks || "0"} more
                  tasks to complete!
                </Text>
              </View>
            </View>
            <View style={styles.progressBox}>
              <View style={styles.progressTitleContainer}>
                <Text style={styles.progressTextTitle}>Streak Count</Text>
              </View>
              <View style={styles.progressRatioContainer}>
                <Text style={styles.progressRatio}>{streakCount}</Text>
              </View>
              <View style={styles.progressSubtextContainer}>
                {streakCount === 0 ? (
                  <Text style={styles.progressSubtext}>
                    Complete your tasks to start your streak!
                  </Text>
                ) : (
                  <Text style={styles.progressSubtext}>
                    You've completed all your tasks for {streakCount} days!
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {lengthOfOverdueTasks > 0 && (
          <TouchableOpacity
            style={styles.overdueContainer}
            onPress={() => props.navigation.navigate("Overdue")}
          >
            <View style={styles.overdueCircle}>
              <Text style={styles.overdueLength}>{lengthOfOverdueTasks}</Text>
            </View>
            <Text style={styles.overdueText}>View Overdue</Text>
          </TouchableOpacity>
        )}

        <View style={styles.tasksContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>TO DO</Text>
          </View>
          {tasksOfDate.map((task, index) => {
            if (!task.completed)
              return (
                <HomeTask
                  key={task.id}
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
        {/* <TasksList /> */}
        {/* <View style={styles.remindersContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>UPCOMING REMINDERS</Text>
          </View>
          <RemindersList homeMode={true} />
        </View> */}
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
  datesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  individualDate: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  dayOfWeek: {
    fontWeight: "300",
    color: "#6c6c6c",
  },
  dayOfMonth: {
    color: "#454545",
    marginTop: 5,
  },
  activeIndividualDate: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#0071E3",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  activeDayOfWeek: {
    fontWeight: "600",
    color: "white",
  },
  activeDayOfMonth: {
    marginTop: 5,
    color: "white",
    fontWeight: "600",
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  overdueContainer: {
    display: "flex",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 130,
    backgroundColor: "white",
  },
  overdueText: {
    textAlign: "center",
    fontWeight: "500",
    color: "#F05252",
  },
  overdueCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 5,
    top: 5,
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "#F05252",
  },
  overdueLength: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  titleContainer: {
    borderBottomColor: "#ababab",
    // borderBottomWidth: 0.2,
    // paddingBottom: 5,
    marginBottom: 5,
  },
  titleHeader: {
    fontSize: 12,
    fontWeight: "300",
    color: "#ababab",
    letterSpacing: 2,
  },
  tasksContainer: {
    marginBottom: 10,
  },
  tasksOfDateContainer: {},
  remindersContainer: {
    marginBottom: 10,
    paddingVertical: 5,
  },
  progressContainer: {
    paddingVertical: 15,
  },
  progressBoxContainer: {
    flex: 1,
    flexDirection: "row",
    height: 110,
    backgroundColor: "#efefef",
    borderRadius: 10,
  },
  progressBox: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: "center",
  },
  progressTitleContainer: {
    height: 20,
    justifyContent: "center",
  },
  progressRatioContainer: {
    display: "flex",
    justifyContent: "center",
    height: 40,
  },
  progressSubtextContainer: {
    height: 30,
  },
  progressTextTitle: {
    color: "#6c6c6c",
    fontWeight: "500",
    fontSize: 15,
  },
  progressRatio: {
    color: "#454545",
    fontSize: 24,
    fontWeight: "700",
  },
  progressSubtext: {
    color: "#6c6c6c",
    fontSize: 12,
  },
});
