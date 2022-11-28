import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { RRule } from "rrule";
import DateTimePicker from "@react-native-community/datetimepicker";
import useNotifications from "../../hooks/notification-hook";
import { useDispatch } from "react-redux";
import { addGoal } from "../../redux/goals-slice";

export default function EditGoal(props) {
  const initialDaysActive = [
    { day: "Mo", isActive: false, rule: RRule.MO, weekday: 2 },
    { day: "Tu", isActive: false, rule: RRule.TU, weekday: 3 },
    { day: "We", isActive: false, rule: RRule.WE, weekday: 4 },
    { day: "Th", isActive: false, rule: RRule.TH, weekday: 5 },
    { day: "Fr", isActive: false, rule: RRule.FR, weekday: 6 },
    { day: "Sa", isActive: false, rule: RRule.SA, weekday: 7 },
    { day: "Su", isActive: false, rule: RRule.SU, weekday: 1 },
  ];

  const { goal } = props.route.params;

  const rruleObj = RRule.fromString(goal.recurRule);

  const constructDaysActive = () => {
    const ruleOptions = rruleObj.options.byweekday;
    let ruleCount = 0;
    let finalArray = [];

    for (let i = 0; i < initialDaysActive.length; i++) {
      let currentObject = initialDaysActive[i];
      if (ruleOptions[ruleCount] === i) {
        currentObject.isActive = true;
        finalArray.push(currentObject);
        ruleCount++;
      } else {
        finalArray.push(currentObject);
      }
    }
    return finalArray;
  };

  const dispatch = useDispatch();

  const [title, setTitle] = useState(goal.title);
  const [content, setContent] = useState(goal.content || "");
  const [repeatIsEnabled, setRepeatIsEnabled] = useState(
    goal.recurRule.length > 0
  );
  const [repeatOptionsVisible, setRepeatOptionsVisible] =
    useState(repeatIsEnabled);
  const [timesPerDay, setTimesPerDay] = useState(goal.timesPerDay);
  const [remindMeState, setRemindMeState] = useState(
    goal?.notificationId?.length > 0
  );
  const [notificationTime, setNotificationTime] = useState(
    new Date(rruleObj?.origOptions.dtstart)
  );
  const { handleScheduleNotification, cancelAllScheduledNotifications } =
    useNotifications();
  const timesRef = useRef();

  const [daysActive, setDaysActive] = useState(constructDaysActive());
  const [custom, setCustom] = useState(false);

  const handleToggleDaysActive = (index) => {
    setDaysActive((prevState) => {
      let data = [...prevState];
      data[index] = { ...data[index], isActive: !data[index].isActive };
      return data;
    });

    setCustom(true);
  };

  const toggleRepeat = () => {
    setRepeatIsEnabled((prevState) => !prevState);
  };

  const toggleRemindMe = () => {
    setRemindMeState((prevState) => !prevState);
  };

  const handleAddGoal = async () => {
    if (!title) {
      Alert.alert("Please enter a title!");
      return;
    }
    const weekdays = daysActive.reduce((acc, el) => {
      if (el.isActive) acc.push(el.rule);
      return acc;
    }, []);

    const rule = new RRule({
      freq: RRule.DAILY,
      interval: 1,
      byweekday: weekdays,
      dtstart: new Date(),
      until: new Date(2026, 12, 31),
    });

    let notificationIdsArray;

    if (remindMeState) {
      const notificationPromises = daysActive.reduce((acc, el) => {
        if (el.isActive) {
          acc.push(
            handleScheduleNotification(
              title,
              notificationTime.getHours(),
              notificationTime.getMinutes(),
              el.weekday
            )
          );
        }
        return acc;
      }, []);

      try {
        notificationIdsArray = await Promise.all(notificationPromises);
      } catch (err) {
        console.error(err);
      }
    }

    const goalDetails = {
      title: title,
      content: content,
      timesPerDay: timesPerDay,
      timesCompleted: "0",
      recurRule: rule.toString(),
      notificationId: notificationIdsArray.toString() || "",
    };

    const response = await dispatch(addGoal(goalDetails)).unwrap();
    if (response) props.navigation.goBack();
  };

  function StickyHeader() {
    return (
      <View style={styles.headingContainer}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <AntDesign name="left" size={25} color="#6c6c6c" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Edit Goal</Text>
        <TouchableOpacity onPress={handleAddGoal}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={75}
      style={styles.container}
    >
      <ScrollView
        stickyHeaderIndices={[0]}
        contentContainerStyle={[{ height: "auto" }]}
      >
        <StickyHeader />
        <View style={styles.innerContainer}>
          <View style={styles.headingInputs}>
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              placeholderTextColor="#cacacb"
              returnKeyType="done"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.descriptionInput}
              placeholder="Description"
              placeholderTextColor="#cacacb"
              returnKeyType="done"
              value={content}
              multiline={true}
              onChangeText={setContent}
            />
          </View>

          <View style={styles.detailInputs}>
            <Pressable
              style={styles.switchContainer}
              onPress={() => timesRef.current.focus()}
            >
              <Text style={styles.switchText}>Times Per Day</Text>
              <TextInput
                style={styles.timesInput}
                keyboardType="number-pad"
                value={timesPerDay}
                onChangeText={setTimesPerDay}
                ref={timesRef}
              />
            </Pressable>
          </View>

          <View style={styles.detailInputs}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Repeat</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                onValueChange={toggleRepeat}
                value={repeatIsEnabled}
              />
            </View>
            <TouchableOpacity
              style={styles.switchContainer}
              onPress={() =>
                setRepeatOptionsVisible((prev) => !repeatOptionsVisible)
              }
            >
              <Text style={styles.switchText}>
                {custom ? "Custom" : "Every Weekday"}
              </Text>
              <Entypo name="chevron-small-down" size={24} color="black" />
            </TouchableOpacity>
            {repeatOptionsVisible && (
              <View style={styles.frequencyContainer}>
                {daysActive.map((w, index) => (
                  <Pressable
                    style={
                      w.isActive
                        ? styles.weekdayBubble
                        : { ...styles.weekdayBubble, backgroundColor: "gray" }
                    }
                    key={index}
                    onPress={() => handleToggleDaysActive(index)}
                  >
                    <Text style={styles.weekdayBubbleText}>{w.day}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.detailInputs}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Remind Me</Text>
              <Switch
                value={remindMeState}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                onValueChange={toggleRemindMe}
              />
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.switchText}>Time</Text>
              <DateTimePicker
                mode="time"
                value={notificationTime}
                display="inline"
                minuteInterval={5}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ffffff",
  },
  innerContainer: {
    paddingHorizontal: 20,
  },
  headingContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c6c6c",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0064e5",
  },
  headingInputs: {
    marginTop: 10,
    borderRadius: 5,
  },
  titleInput: {
    height: 50,
    fontSize: 20,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#454545",
    backgroundColor: "#f4f4f4",
    marginBottom: 5,
    // borderBottomWidth: 0.2,
    // borderBottomColor: "#9CA3AF",
  },
  descriptionInput: {
    height: 75,
    paddingLeft: 10,
    fontSize: 20,
    color: "#454545",
    backgroundColor: "#f4f4f4",
  },
  detailInputs: {
    marginTop: 30,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  switchText: {
    fontWeight: "500",
    fontSize: 18,
    color: "#454545",
  },
  frequencyContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  weekdayBubble: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#81b0ff",
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  weekdayBubbleText: {
    color: "white",
  },
  timesInput: {
    width: 100,
    height: 30,
    textAlign: "right",
    fontSize: 20,
    color: "#454545",
    paddingRight: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
});
