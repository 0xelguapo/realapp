import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { useContext, useState } from "react";
import { TaskContext } from "../context/task-context";
import { AntDesign } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function EachTask({
  title,
  content,
  date,
  client,
  id,
  completed,
}) {
  const { completeTask } = useContext(TaskContext);
  const [checked, setChecked] = useState(false);

  const taskDetails = {
    id: id,
    title: title,
    date: date,
    client: client,
    completed: true,
  };

  const handleCompleted = async () => {
    setChecked(true);
    let response = await completeTask(taskDetails);
    if (!response) {
      setChecked(false);
    }
  };

  return (
    <GestureHandlerRootView>
      <Pressable>
        <TouchableHighlight underlayColor="#f1f1f1">
          <View style={styles.container}>
            <View style={styles.goContainer}>
              <Pressable onPress={handleCompleted} disabled={checked}>
                {!checked ? (
                  <View style={styles.circle}></View>
                ) : (
                  <View style={styles.checkedCircle}>
                    <AntDesign name="checkcircle" size={24} color="#7b7b7c" />
                  </View>
                )}
              </Pressable>
            </View>
            <View style={styles.textContainer}>
              <Text style={!checked ? styles.title : styles.checkedTitle}>
                {title}
              </Text>
              <View style={styles.contentContainer}>
                <Text style={!checked ? styles.content : styles.checkedContent}>
                  {content}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Pressable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#454545",
  },
  checkedTitle: {
    fontWeight: "600",
    fontSize: 18,
    textDecorationLine: "line-through",
  },
  content: {
    color: "#6c6c6c",
  },
  checkedContent: {
    color: "#7b7b7c",
    textDecorationLine: "line-through",
  },
  goContainer: {
    display: "flex",
    justifyContent: "center",
    marginRight: 14,
  },
  circle: {
    width: 21,
    height: 21,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: "#7b7b7c",
  },
});

EachTask.defaultProps = {
  taskMode: false,
  checked: false,
};
