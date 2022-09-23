import { StyleSheet, Text, View, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ViewAllReminders() {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <AntDesign name="left" size={24} color="#ababab" />
        <Text style={styles.screenTitle}>All Reminders</Text>
      </View>
      <ScrollView style={styles.bodyContainer}>
        
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
    justifyContent: "center",
  },
  screenTitle: {
    fontWeight: "500",
    fontSize: 18,
    marginTop: 10,
  },
});
