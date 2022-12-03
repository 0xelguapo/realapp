import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { format } from "date-fns";
import SwipeToDeleteWrapper from "../../components/gesture/SwipeToDeleteWrapper";
import useReminders from "../../hooks/reminders-hook";
import ScreenHeading from "../../components/UI/ScreenHeading";

export default function ViewAllReminders(props) {
  const { allReminders, handleDeleteReminder } = useReminders();

  return (
    <View style={styles.container}>
      <ScreenHeading
        screenTitle={"All Reminders"}
        handleGoBack={props.navigation.goBack}
      />
      <ScrollView style={{ flex: 1 }}>
        {allReminders.map((rem, index) => (
          <SwipeToDeleteWrapper
            key={rem.id}
            index={index}
            length={allReminders.length}
            viewStyle={{ backgroundColor: "#f5f5f5" }}
            handleDelete={() => handleDeleteReminder(rem)}
          >
            <TouchableOpacity
              style={styles.reminderContainer}
              onPress={() =>
                props.navigation.navigate("ClientDetails", {
                  client: { id: rem.client.id },
                })
              }
            >
              <View style={styles.reminderDetailsContainer}>
                <Text style={styles.reminderTitle}>
                  {rem.client.firstName + " " + rem.client?.lastName}
                </Text>
                <Text style={styles.reminderFreq}>
                  {rem.freq[0].toUpperCase() + rem.freq.slice(1)}
                </Text>
                <Text style={styles.reminderDate}>
                  Created on {format(new Date(rem.createdAt), "LLL d, y")}
                </Text>
              </View>

              <View style={styles.clientIconContainer}>
                <Ionicons name="person-outline" size={15} color="#6c6c6c" />
                <Entypo name="chevron-right" size={15} color="#6c6c6c" />
              </View>
            </TouchableOpacity>
          </SwipeToDeleteWrapper>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  reminderContainer: {
    minHeight: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    flexDirection: "row",
    alignItems: "center",
  },
  reminderDetailsContainer: {
    flex: 1,
  },
  reminderTitle: {
    fontWeight: "600",
    fontSize: 16,
    color: "#454545",
  },
  reminderFreq: {
    fontWeight: "500",
    color: "#6c6c6c",
  },
  reminderDate: {
    fontSize: 12,
    marginTop: 3,
    color: "#6c6c6c",
    fontWeight: "300",
  },
  clientIconContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
