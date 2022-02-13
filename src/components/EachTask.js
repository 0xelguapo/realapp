import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function EachTask({
  title, content, date, client
}) {

  return (
    <Pressable>
      <TouchableHighlight underlayColor="#f1f1f1">
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
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
  title: {
    fontWeight: "600",
    fontSize: 19,
  },
  content: {
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

EachTask.defaultProps = {
  taskMode: false,
  checked: false,
};
