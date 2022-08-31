import { View, Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { AntDesign } from "@expo/vector-icons";
import useClient from "../hooks/client-hook";

export default function Reminder({ id, name, date }) {
  const [checked, setChecked] = useState(false);
  const { deleteReminder } = useClient();

  const handleDeleteReminder = async () => {
    let response = await deleteReminder(id);
    console.log(response);
    setChecked(true);
  };

  return (
    <View style={styles.reminder} key={id}>
      {!checked ? (
        <Pressable
          style={styles.circle}
          onPress={handleDeleteReminder}
        ></Pressable>
      ) : (
        <AntDesign name="checkcircle" size={15} color="#7b7b7c" />
      )}
      <Pressable style={styles.reminderDetails}>
        <Text
          style={
            !checked
              ? styles.reminderClientName
              : styles.checkedReminderClientName
          }
        >
          {name}
        </Text>
        <Text
          style={!checked ? styles.reminderDate : styles.checkedReminderDate}
        >
          {"in 0 days"
            ? "today"
            : formatDistanceToNowStrict(parseISO(date), {
                addSuffix: true,
                unit: "day",
              })}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  reminder: {
    paddingVertical: 5,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  reminderDetails: { marginLeft: 10 },
  reminderClientName: {
    fontWeight: "500",
    fontSize: 16,
    color: "#454545",
  },
  checkedReminderClientName: {
    fontWeight: "500",
    fontSize: 16,
    color: "#d3d3d3",
  },
  reminderDate: {
    fontSize: 12,
    color: "#ababab",
  },
  circle: {
    width: 15,
    height: 15,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: "#7b7b7c",
  },
  checkedCircle: {
    width: 15,
    height: 15,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: "#7b7b7c",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedReminderDate: {
    fontSize: 12,
    color: "#d3d3de",
  },
});
