import { View, Text, StyleSheet } from "react-native";
import { GoalRow } from "../gesture/GoalRow";
import SwipeableGoal from "../gesture/SwipeableGoal";

export default function GoalsList({
  goalsOfDay,
  allGoalsLength,
  handleViewEditGoal,
  getGoalIncrementAmount,
}) {
  return goalsOfDay.length > 0 ? (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.titleHeader}>DAILY GOALS</Text>
      </View>
      <View style={styles.goalsContainer}>
        {goalsOfDay.map((goal, index) => (
          <SwipeableGoal
            key={goal.id}
            goalId={goal.id}
            incrementAmount={getGoalIncrementAmount(goal.timesPerDay)}
            timesCompleted={goal.timesCompleted}
            timesPerDay={goal.timesPerDay}
            notificationId={goal.notificationId}
          >
            <GoalRow
              title={goal.title}
              content={goal.content}
              timesPerDay={goal.timesPerDay}
              timesCompleted={goal.timesCompleted}
              handlePress={() => handleViewEditGoal(goal)}
              length={allGoalsLength}
              index={index}
            />
          </SwipeableGoal>
        ))}
      </View>
    </>
  ) : null;
  // <View style={styles.emptyContainer}>
  //   {/* <Text style={styles.emptyText}>Set up your first goals!</Text> */}
  //   <Text style={styles.emptySubtext}>
  //     Setting up daily goals help you stay productive
  //   </Text>
  // </View>
}

const styles = StyleSheet.create({
  goalsContainer: {
    borderRadius: 5,
    backgroundColor: "white",
  },
  emptyContainer: {
    minHeight: 75,
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
