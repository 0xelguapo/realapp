import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReminders,
  selectAllReminders,
} from "../../redux/reminders-slice";
import { format } from "date-fns";

export default function ViewAllReminders(props) {
  const dispatch = useDispatch();
  const allReminders = useSelector(selectAllReminders);

  useEffect(() => {
    const getReminders = async () => {
      const response = await dispatch(fetchReminders()).unwrap();
      console.log(response);
    };
    getReminders();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={props.navigation.goBack}
        >
          <AntDesign name="left" size={24} color="#ababab" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>All Reminders</Text>
      </View>
      <ScrollView>
        {allReminders.map((rem, index) => (
          <View key={rem.id} style={styles.reminderContainer}>
            <Text style={styles.reminderTitle}>{rem.client.firstName + " " + rem.client?.lastName}</Text>
            <Text style={styles.reminderFreq}>{rem.freq[0].toUpperCase() + rem.freq.slice(1)}</Text>
            <Text style={styles.reminderDate}>Created on {format(new Date(rem.createdAt), 'LLL d, y')}</Text>
          </View>
        ))}
      </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "center",
    marginBottom: 5,
  },
  backIconContainer: {
    position: "absolute",
    left: 0,
  },
  screenTitle: {
    fontWeight: "500",
    fontSize: 20,
    marginLeft: 5,
  },
  reminderContainer: {
    minHeight: 60,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  reminderTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#454545'
  },
  reminderFreq: {
    fontWeight: '500',
    color: '#6c6c6c'
  },
  reminderDate: {
    fontSize: 12,
    marginTop: 3,
    color: '#6c6c6c',
    fontWeight: '300'
  },
});
