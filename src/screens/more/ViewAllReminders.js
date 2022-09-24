import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useEffect, useContext } from "react";
import { RemindersContext } from "../../context/reminder-context";
import RemindersList from "../../components/home/RemindersList";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReminders,
  selectAllReminders,
} from "../../redux/reminders-slice";
import { AntDesign } from "@expo/vector-icons";
import Reminder from "../../components/client/Reminder";

export default function ViewAllReminders(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <AntDesign
          name="left"
          size={24}
          color="#ababab"
          onPress={props.navigation.goBack}
        />
        <Text style={styles.screenTitle}>All Reminders</Text>
      </View>
      <RemindersList homeMode={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 20,
  },
  headingContainer: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 10,
  },
  screenTitle: {
    fontWeight: "500",
    fontSize: 20,
    marginTop: 10,
  },
});
