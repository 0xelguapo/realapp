import * as Notifications from "expo-notifications";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteOneReminder } from "../../redux/reminders-slice";

export default function Reminder({
  id,
  firstName = '',
  lastName = '',
  date,
  notificationId,
}) {
  const fullName = lastName ? firstName + " " + lastName : firstName;

  const dispatch = useDispatch();

  let formattedDate = formatDistanceToNowStrict(parseISO(date), {
    addSuffix: true,
    unit: "day",
  });
  const [checked, setChecked] = useState(false);
  const [dateState, setDateState] = useState(formattedDate);
  const [pastDate, setPastDate] = useState(false);

  const handleDeleteReminder = async () => {
    setChecked(true);
    if (notificationId) {
      try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
      } catch (err) {
        console.error(err);
      }
    }
    const response = await dispatch(deleteOneReminder(id)).unwrap()
    console.log(response)
  };

  const handleDateFormat = () => {
    if (formattedDate === "in 0 days") setDateState("today");
    else if (formattedDate.split(" ").pop() === "ago") {
      setPastDate(true);
    }
  };

  useEffect(() => {
    handleDateFormat();
  }, []);

  return (
    <View style={styles.reminder} key={id}>
      {!checked ? (
        <Pressable
          style={styles.circle}
          onPress={handleDeleteReminder}
        ></Pressable>
      ) : (
        <AntDesign name="checkcircle" size={18} color="#7b7b7c" />
      )}
      <Pressable style={styles.reminderDetails}>
        <Text
          style={
            !checked
              ? styles.reminderClientName
              : styles.checkedReminderClientName
          }
        >
          {fullName ? fullName : 'Deleted Client'}
        </Text>
        <Text
          style={[
            !checked ? styles.reminderDate : styles.checkedReminderDate,
            pastDate && styles.pastReminderDate,
          ]}
        >
          {dateState}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  reminder: {
    paddingVertical: 8,
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
  pastReminderDate: { color: "red" },
  circle: {
    width: 18,
    height: 18,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: "#7b7b7c",
  },
  checkedCircle: {
    width: 18,
    height: 18,
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
