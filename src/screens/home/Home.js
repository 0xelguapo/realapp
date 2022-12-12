import Purchases from "react-native-purchases";
import { ENTITLEMENT_ID } from "../../constants";
import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { getUserStreak, updateUserStreak } from "../../graphql/customQueries";
import { fetchTasks } from "../../redux/tasks-slice";
import { MaterialIcons } from "@expo/vector-icons";
import { add, sub, formatDistanceToNowStrict } from "date-fns";
import AddHome from "../../components/UI/MultiAddButton";
import { AuthContext } from "../../context/auth-context";
import { fetchGoals } from "../../redux/goals-slice";
import HomeDate from "./HomeDate";
import useGoals from "../../hooks/goals-hook";
import useTasks from "../../hooks/tasks-hook";
import ProgressContainer from "../../components/home/ProgressContainer";
import OverdueTasks from "../../components/home/OverdueTasks";
import TaskList from "../../components/home/TasksList";
import GoalsList from "../../components/home/GoalsList";
import useReminders from "../../hooks/reminders-hook";
import HomeReminder from "../../components/home/HomeReminder";

export default function Home(props) {
  let date = new Date();
  const dispatch = useDispatch();

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

  const { remindersOfDate } = useReminders(activeDate);

  const { allGoals, goalsOfDay, getGoalIncrementAmount } = useGoals(activeDate);
  const {
    tasksOfDate,
    lengthOfCompletedTasks,
    lengthOfOverdueTasks,
    handleCompleteTask,
  } = useTasks(activeDate);

  useEffect(() => {
    const displayPaywall = async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        if (
          typeof customerInfo.entitlements.active[ENTITLEMENT_ID] ===
          "undefined"
        ) {
          props.navigation.navigate("Paywall");
        }
      } catch (err) {
        console.error(err);
      }
    };
    displayPaywall();
  }, []);

  useEffect(() => {
    let streakResponse;
    let streakDate;

    const getStreak = async () => {
      streakResponse = await API.graphql(
        graphqlOperation(getUserStreak, { id: user.attributes.sub })
      );
      setStreakCount(parseInt(streakResponse.streakgetUser.streakCount));
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

  const handleManualRefresh = () => {
    setRefreshVisible(false);
    setTimeout(() => {
      setRefreshVisible(true);
    }, 2000);
    dispatch(fetchTasks());
    dispatch(fetchGoals());
  };

  const handleViewEditGoal = (goal) => {
    props.navigation.navigate("EditGoal", { goal: goal });
  };

  const renderDate = ({ item, index }) => {
    return (
      <View style={styles.homeDateContainer}>
        <HomeDate
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          index={index}
          date={item}
          nextFiveDates={nextFiveDates}
        />
      </View>
    );
  };

  const onDatesEnd = () => {
    let lastDay = nextFiveDates.length - 1;
    if (lastDay < 1000) {
      let temp = [...nextFiveDates];
      for (let i = lastDay; i < lastDay + 10; i++) {
        temp.push(add(date, { days: i }));
      }
      setNextFiveDates(temp);
    }
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
      <AddHome
        activeDate={activeDate.toString()}
        showAddClient={true}
        showAddTask={true}
        showAddGoal={true}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Focus</Text>
      </View>

      <View style={styles.flatListDatesContainer}>
        <FlatList
          renderItem={renderDate}
          data={nextFiveDates}
          horizontal={true}
          contentContainerStyle={[{ paddingHorizontal: 10 }]}
          onEndReached={onDatesEnd}
          onEndReachedThreshold={0.2}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <ScrollView
        style={styles.bodyContainer}
        contentContainerStyle={[{ paddingBottom: 50 }]}
      >
        <ProgressContainer
          tasksOfDate={tasksOfDate}
          lengthOfCompletedTasks={lengthOfCompletedTasks}
          streakCount={streakCount}
        />

        <OverdueTasks
          lengthOfOverdueTasks={lengthOfOverdueTasks}
          onPress={() =>
            props.navigation.navigate("Overdue", {
              activeDate: activeDate.toString(),
            })
          }
        />

        {remindersOfDate.length > 0 && (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.titleHeader}>CONTACT REMINDERS</Text>
            </View>
            <View style={styles.reminderContainer}>
              {remindersOfDate.map((rem, index) => {
                return (
                  <HomeReminder
                    key={rem.id}
                    reminder={rem}
                    activeDate={activeDate}
                    onPress={() =>
                      props.navigation.navigate("ClientDetails", {
                        client: { id: rem.client.id },
                        viewContactInfo: true,
                      })
                    }
                  />
                );
              })}
            </View>
          </>
        )}

        <GoalsList
          handleViewEditGoal={handleViewEditGoal}
          goalsOfDay={goalsOfDay}
          allGoalsLength={allGoals.length}
          getGoalIncrementAmount={getGoalIncrementAmount}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.titleHeader}>TO DO</Text>
        </View>
        <TaskList
          tasksOfDate={tasksOfDate}
          handleCompleteTask={handleCompleteTask}
        />
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
    fontSize: 18,
    color: "#454545",
  },
  refreshContainer: {
    position: "absolute",
    right: 30,
    top: 55,
    zIndex: 3,
  },

  flatListDatesContainer: {
    flexDirection: "row",
    height: 50,
  },
  homeDateContainer: {
    marginRight: 30,
  },

  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  reminderContainer: {
    borderRadius: 5,
    backgroundColor: "white",
  },

  titleContainer: {
    borderBottomColor: "#ababab",
    // borderBottomWidth: 0.2,
    // paddingBottom: 5,
    marginBottom: 5,
    marginTop: 10,
  },
  titleHeader: {
    fontSize: 12,
    fontWeight: "300",
    color: "#ababab",
    letterSpacing: 2,
  },
});
