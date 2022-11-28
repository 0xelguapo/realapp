import { View, Text, StyleSheet } from "react-native";
import { GoalRow } from "../gesture/GoalRow";
import SwipeableGoal from "../gesture/SwipeableGoal";

export default function GoalsList({ goalsOfDay, allGoalsLength, handleViewEditGoal, getGoalIncrementAmount }) {

  return (
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
  );
}

const styles = StyleSheet.create({
  goalsContainer: {
    borderRadius: 5,
    backgroundColor: "white",
  },
});
