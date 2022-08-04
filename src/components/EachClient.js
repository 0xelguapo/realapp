import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function EachClient({
  name,
  phone,
  company,
  email,
  onPress,
  taskMode,
  index
}) {
  const formattedPhone =
    phone.length <= 10
      ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      : `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(
          4,
          7
        )}-${phone.slice(7, 11)}`;

  //for the add task view
  if (taskMode) {
    return (
      <Pressable>
        <TouchableHighlight onPress={onPress} underlayColor="#f1f1f1">
          <View style={styles.taskModeContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.company}>{company}</Text>
          </View>
        </TouchableHighlight>
      </Pressable>
    );
  }
  
  return (
    <Pressable>
      <TouchableHighlight onPress={onPress} underlayColor="#f1f1f1">
        <View style={styles.container}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{formattedPhone}</Text>
          <View style={styles.goContainer}>
            <SimpleLineIcons name="options" size={24} color="#dddddf" />
          </View>
        </View>
      </TouchableHighlight>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
  },
  name: {
    fontWeight: "600",
    fontSize: 19,
  },
  company: {
    color: "#7b7b7c",
  },
  phone: {
    color: "#7b7b7c",
  },
  goContainer: {
    position: "absolute",
    right: 25,
    top: 25,
  },
  taskModeContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 10,
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
  },
});

EachClient.defaultProps = {
  taskMode: false,
  checked: false,
};
