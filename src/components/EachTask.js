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
import { useDispatch } from "react-redux";
import { removeOneTask } from "../redux/tasks-slice";

export default function EachTask({
  id,
  title,
  content,
  date,
  client,
  completed = false,
  taskMode = false,
}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleCompleted = async () => {
    setChecked(true);
    dispatch(removeOneTask(id));
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
                    <AntDesign name="checkcircle" size={18} color="#7b7b7c" />
                  </View>
                )}
              </Pressable>
            </View>
            <View style={styles.textContainer}>
              <Text style={!checked ? styles.title : styles.checkedTitle}>
                {title}
              </Text>
              {content?.length !== 0 && (
                <View style={styles.contentContainer}>
                  <Text
                    style={!checked ? styles.content : styles.checkedContent}
                  >
                    {content}
                  </Text>
                </View>
              )}
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
    alignItems: "center",
    paddingVertical: 10,
    height: 50,
    // borderBottomWidth: 0.5,
    // borderBottomColor: "#e6e6e6",
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    color: "#454545",
  },
  checkedTitle: {
    fontWeight: "500",
    fontSize: 16,
    color: "#d3d3d3",
  },
  content: {
    fontSize: 12,
    color: "#ababab",
  },
  checkedContent: {
    color: "#7b7b7c",
    textDecorationLine: "line-through",
    color: "#d3d3d3",
  },
  goContainer: {
    display: "flex",
    justifyContent: "center",
    marginRight: 10,
  },
  circle: {
    width: 18,
    height: 18,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: "#7b7b7c",
  },
});
