import * as Notifications from "expo-notifications";
import {
  format,
  add,
  setHours,
  getISODay,
  getISOWeek,
  getWeekOfMonth,
  startOfDay,
  endOfDay,
} from "date-fns";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { createOneReminder } from "../../redux/reminders-slice";
import useNotifications from "../../hooks/notification-hook";
import { RRule } from "rrule";

export default function EditReminder(props) {
  const { goBack } = props.navigation;
  const { clientId, homeMode, firstName, lastName } = props.route.params;
  const fullName = lastName ? firstName + " " + lastName : firstName;
  const dispatch = useDispatch();

  const { getScheduledNotifications, cancelAllScheduledNotifications } =
    useNotifications();

  const handleScheduleNotification = async (time) => {
    const response = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Follow up with " + fullName.toUpperCase(),
        body: `This is a reminder to contact ${fullName}`,
      },
      trigger: time,
    });
    console.log(response);
    return response;
  };

  const createRRule = (freq, interval) => {
    const rule = new RRule({
      freq: freq,
      interval: interval,
      dtstart: startOfDay(new Date()),
      until: endOfDay(new Date(2028, 12, 31)),
    });

    return rule.toString();
  };


  const handleCreateReminder = async (length) => {
    let date = new Date();
    let notificationId;
    let recurRule;
    switch (length) {
      // case "tomorrow":
      //   date.setDate(date.getDate() + 1);
      //   date.setHours(9);
      //   date.setMinutes(0);
      //   notificationId = await handleScheduleNotification(date);
      //   break;
      case "weekly":
        recurRule = createRRule(RRule.WEEKLY, 1)
        notificationId = await handleScheduleNotification({
          repeats: true,
          weekday: getISODay(date),
          hour: 9,
        });
        break;
      case "monthly":
        recurRule = createRRule(RRule.MONTHLY, 1)
        notificationId = await handleScheduleNotification({
          repeats: true,
          weekOfMonth: getWeekOfMonth(new Date()),
          hour: 9,
        });
        break;
      case "quarterly":
        recurRule = createRRule(RRule.YEARLY, 4)
        const quarters = [1, 2, 3, 4];
        const promises = quarters.map((num) => {
          return handleScheduleNotification({
            repeats: true,
            quarter: num,
            hour: 9,
          });
        });
        notificationId = (await Promise.all(promises)).join(',');
        break;
      case "yearly":
        recurRule = createRRule(RRule.YEARLY, 1)
        notificationId = await handleScheduleNotification({
          repeats: true,
          weekOfYear: getISOWeek(new Date()),
          hour: 9,
        });
        break;
    }
    dispatch(
      createOneReminder({
        freq: length,
        clientId: clientId,
        notificationId: notificationId,
        recurRule: recurRule
      })
    );
    if (!homeMode) {
      props.navigation.navigate({
        name: "ClientDetails",
        params: { id: clientId },
        merge: true,
      });
    } else {
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={goBack}
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.3)" },
        ]}
      />
      <View style={styles.modalContainer}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.titleHeader}>Set a Reconnect Reminder</Text>
        </View>
        <View style={styles.optionsContainer}>
          {/* <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("tomorrow")}
          >
            <Text style={styles.optionText}>Tomorrow</Text>
            <Text style={styles.optionSubtext}>ONE DAY FROM NOW</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("weekly")}
          >
            <Text style={styles.optionText}>Weekly</Text>
            <Text style={styles.optionSubtext}>EVERY WEEK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("monthly")}
          >
            <Text style={styles.optionText}>Monthly</Text>
            <Text style={styles.optionSubtext}>EVERY MONTH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("quarterly")}
          >
            <Text style={styles.optionText}>Quarterly</Text>
            <Text style={styles.optionSubtext}>EVERY THREE MONTHS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.option, borderBottomWidth: 0 }}
            onPress={() => handleCreateReminder("yearly")}
          >
            <Text style={styles.optionText}>Yearly</Text>
            <Text style={styles.optionSubtext}>EVERY YEAR</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ ...styles.option, borderBottomWidth: 0 }}>
            <Text style={styles.optionText}>Custom</Text>
            <Text style={styles.optionSubtext}>SET A CUSTOM DATE</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <TouchableOpacity style={styles.cancelContainer} onPress={goBack}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
    justifyContent: "flex-end",
  },
  modalContainer: {
    display: "flex",
    backgroundColor: "#f9f9f9",
    borderRadius: 18,
    width: "95%",
    height: "auto",
  },
  titleHeaderContainer: {
    display: "flex",
    backgroundColor: "#f1f1f1",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    height: 50,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ababab",
    letterSpacing: 1.5,
    paddingVertical: 5,
  },
  optionsContainer: {
    display: "flex",
  },
  option: {
    height: 60,
    borderBottomColor: "#d9d9d9",
    borderBottomWidth: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  optionText: {
    fontSize: 15,
    color: "#454545",
    fontWeight: "400",
  },
  optionSubtext: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 10,
    paddingVertical: 3,
  },
  cancelContainer: {
    backgroundColor: "#f1f1f1",
    width: "95%",
    borderRadius: 18,
    marginTop: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "red",
  },
});
