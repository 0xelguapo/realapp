import { useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReminders,
  selectAllReminders,
} from "../../redux/reminders-slice";
import Reminder from "../client/Reminder";
import { parseISO, differenceInCalendarDays } from "date-fns";

export default function RemindersList(props) {
  const dispatch = useDispatch();
  let dateHelper = new Date();

  const allReminders = useSelector(selectAllReminders);

  const upcomingReminders = allReminders.filter((el) => {
    const result = differenceInCalendarDays(parseISO(el.date), dateHelper);
    if (result <= 5) return true;
    else return false;
  });

  useEffect(() => {
    dispatch(fetchReminders());
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={{}}>
      {props.homeMode ? (
        upcomingReminders.length > 0 ? (
          upcomingReminders.map((item) => (
            <Reminder
              key={item.id}
              id={item.id}
              firstName={item.client.firstName}
              lastName={item.client.lastName}
              date={item.date}
              notificationId={item.notificationId}
            />
          ))
        ) : (
          <Text style={styles.placeholder}>
            Reminders less than 3 days will show here
          </Text>
        )
      ) : (
        allReminders.map((item) => (
          <Reminder
            key={item.id}
            id={item.id}
            firstName={item.client.firstName}
            lastName={item.client.lastName}
            date={item.date}
          />
        ))
      )}
      {}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    color: "#ababab",
    paddingVertical: 5,
  },
});
