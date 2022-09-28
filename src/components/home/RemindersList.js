import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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

  const allReminders = useSelector(selectAllReminders)

  // const filterRemindersToUpcoming = (arrayOfReminders) => {
  //   const copyOfReminders = [...arrayOfReminders];
  //   copyOfReminders.filter((el) => {
  //     const result = differenceInCalendarDays(parseISO(el.date), dateHelper);
  //     if (result <= 5) return true;
  //     else return false;
  //   })
  //   return copyOfReminders
  // }


  const upcomingReminders = allReminders
    .filter((el) => {
      const result = differenceInCalendarDays(parseISO(el.date), dateHelper);
      if (result <= 5) return true;
      else return false;
    })
  
  useEffect(() => {
    dispatch(fetchReminders());
  }, [dispatch]);

  return (
    <ScrollView>
      {props.homeMode ? (
        upcomingReminders.length > 0 ? (
          upcomingReminders.map((item) => (
            <Reminder
              key={item.id}
              id={item.id}
              name={item.client.name}
              date={item.date}
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
            name={item.client.name}
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
