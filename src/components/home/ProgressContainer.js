import { View, Text, StyleSheet } from "react-native";

export default function ProgressContainer({
  tasksOfDate,
  lengthOfCompletedTasks,
  streakCount,
}) {
  return (
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
              {tasksOfDate?.length - lengthOfCompletedTasks || "0"} more tasks
              to complete!
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
  );
}

const styles = StyleSheet.create({
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
