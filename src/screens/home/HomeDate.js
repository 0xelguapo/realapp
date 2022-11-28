import { Pressable, View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";

export default function HomeDate({
  activeDate,
  setActiveDate,
  index,
  date,
  nextFiveDates,
}) {
  return (
    <Pressable
      style={
        activeDate === date
          ? styles.activeIndividualDate
          : styles.individualDate
      }
      key={index}
      onPress={() => setActiveDate(nextFiveDates[index])}
    >
      <Text
        style={activeDate === date ? styles.activeDayOfWeek : styles.dayOfWeek}
      >
        {format(date, "EEEEEE").toUpperCase()}
      </Text>
      <Text
        style={activeDate === date ? styles.activeDayOfMonth : styles.dayOfMonth}
      >
        {format(date, "d")}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  individualDate: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  dayOfWeek: {
    fontWeight: "300",
    color: "#6c6c6c",
  },
  dayOfMonth: {
    color: "#454545",
    marginTop: 5,
  },
  activeIndividualDate: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#0071E3",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  activeDayOfWeek: {
    fontWeight: "600",
    color: "white",
  },
  activeDayOfMonth: {
    marginTop: 5,
    color: "white",
    fontWeight: "600",
  },
});
