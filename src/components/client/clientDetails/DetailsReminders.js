import { ScrollView, StyleSheet, Text, View } from "react-native";
import { format, parseISO } from "date-fns";
import { Feather } from "@expo/vector-icons";

export default function DetailsReminders({ clientDetailsState }) {
  return (
    <View style={styles.remindersContainer}>
      <View style={styles.bellIcon}>
        <Feather name="bell" size={15} color="#535353" />
      </View>
      <ScrollView
        style={styles.reminders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {clientDetailsState.reminder.items?.length > 0 ? (
          clientDetailsState.reminder.items.map((item) => (
            <View key={item.id} style={styles.reminder}>
              <Text style={styles.reminderDate}>
                {item.freq}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyPlaceholderContainer}>
            <Text style={styles.emptyPlaceholder}>No reminders set up...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  remindersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  reminders: {
    height: 35,
    paddingVertical: 5,
  },
  reminder: {
    marginRight: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: "#e4e4e4",
    justifyContent: "center",
  },
  reminderDate: {
    display: "flex",
    color: "#545454",
    fontWeight: "500",
  },
  bellIcon: { marginRight: 5 },
  emptyPlaceholderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyPlaceholder: {
    color: "#ababab",
  },
});
