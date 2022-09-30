import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { createOneReminder } from "../../redux/reminders-slice";

export default function EditReminder(props) {
  const { goBack } = props.navigation;
  const { clientId, homeMode } = props.route.params;
  const dispatch = useDispatch();

  const handleCreateReminder = async (length) => {
    let date = new Date();
    switch (length) {
      case "oneDay":
        date.setDate(date.getDate() + 1);
        break;
      case "oneWeek":
        date.setDate(date.getDate() + 7);
        break;
      case "oneMonth":
        date.setDate(date.getDate() + 30);
        break;
      case "quarter":
        date.setDate(date.getDate() + 90);
        break;
      case "year":
        date.setDate(date.getDate() + 365);
        break;
    }
    dispatch(createOneReminder({ date: date, clientId: clientId }));
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
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("oneDay")}
          >
            <Text style={styles.optionText}>Tomorrow</Text>
            <Text style={styles.optionSubtext}>ONE DAY FROM NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("oneWeek")}
          >
            <Text style={styles.optionText}>Week</Text>
            <Text style={styles.optionSubtext}>ONE WEEK FROM NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("oneMonth")}
          >
            <Text style={styles.optionText}>Month</Text>
            <Text style={styles.optionSubtext}>ONE MONTH FROM NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("quarter")}
          >
            <Text style={styles.optionText}>Quarter</Text>
            <Text style={styles.optionSubtext}>THREE MONTHS FROM NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleCreateReminder("year")}
          >
            <Text style={styles.optionText}>Year</Text>
            <Text style={styles.optionSubtext}>ONE YEAR FROM NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.option, borderBottomWidth: 0 }}>
            <Text style={styles.optionText}>Custom</Text>
            <Text style={styles.optionSubtext}>SET A CUSTOM DATE</Text>
          </TouchableOpacity>
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
