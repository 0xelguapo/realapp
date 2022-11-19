import { RectButton } from "react-native-gesture-handler";
import { Animated, StyleSheet, View, Text, I18nManager } from "react-native";


export const GoalRow = ({ title, content, timesPerDay, timesCompleted }) => (
  <RectButton style={styles.rectButton}>
    <Text style={styles.fromText}>{title}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {content}
    </Text>
    <Text style={styles.dateText}>
      {`${timesCompleted}/${timesPerDay}`}
    </Text>
  </RectButton>
);

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  messageText: {
    color: "#999",
    backgroundColor: "transparent",
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 20,
    top: '50%',
    color: "#999",
    fontWeight: "bold",
  },
});