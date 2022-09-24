import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RemindersList from "../../components/home/RemindersList";
import { AntDesign } from "@expo/vector-icons";

export default function ViewAllReminders(props) {
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
});
