import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function OverdueTasks({ lengthOfOverdueTasks, onPress  }) {
  if (lengthOfOverdueTasks > 0) {
    return (
      <TouchableOpacity
        style={styles.overdueContainer}
        onPress={onPress}
      >
        <View style={styles.overdueCircle}>
          <Text style={styles.overdueLength}>{lengthOfOverdueTasks}</Text>
        </View>
        <Text style={styles.overdueText}>View Overdue</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
});
