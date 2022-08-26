import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function EditReminder(props) {
  const { goBack } = props.navigation;

  
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack} style={styles.backdrop}></Pressable>
      <View style={styles.modalContainer}>
        <View style={styles.titleHeaderContainer}>
          <Text style={styles.titleHeader}>Set a Reconnect Reminder</Text>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <Text style={styles.optionText}>Once</Text>
            <Text style={styles.optionSubtext}>ONE TIME</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Weekly</Text>
            <Text style={styles.optionSubtext}>EVERY WEEK</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Monthly</Text>
            <Text style={styles.optionSubtext}>EVERY MONTH</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Quarterly</Text>
            <Text style={styles.optionSubtext}>EVERY 3 MONTHS</Text>
          </View>
          <View style={{ ...styles.option, borderBottomWidth: 0 }}>
            <Text style={styles.optionText}>Yearly</Text>
            <Text style={styles.optionSubtext}>EVERY YEAR</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.cancelContainer} onPress={goBack}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .3)",
    alignItems: "center",
    paddingBottom: 90,
    justifyContent: "flex-end",
  },
  backdrop: {
    height: "110%",
    position: "absolute",
    width: "100%",
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
    color: '#454545',
    fontWeight: '400'
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
