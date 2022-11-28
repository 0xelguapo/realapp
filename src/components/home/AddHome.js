import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import OptionIcon from "./OptionIcon";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function AddHome({ activeDate }) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      delay: 250,
      duration: 400,
    }).start();
  }, [fadeAnim]);

  const handleViewAddClient = () => {
    navigation.navigate("AddClient");
    setVisible(false);
  };

  const handleViewAddTask = () => {
    navigation.navigate("AddTask", { activeDate });
    setVisible(false);
  };

  const handleViewAddReminder = () => {
    navigation.navigate("AddReminder");
    setVisible(false);
  };

  const handleViewAddGoal = () => {
    navigation.navigate("AddGoal")
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <>
          <View style={styles.iconsContainer}>
            <OptionIcon onPress={handleViewAddClient} text={"Add Client"}>
              <Ionicons name="ios-person-add" size={28} color="black" />
            </OptionIcon>
            <OptionIcon onPress={handleViewAddTask} text={"Add Task"}>
              <Entypo name="add-to-list" size={28} color="black" />
            </OptionIcon>
            {/* <OptionIcon onPress={handleViewAddReminder} text={"Add Reminder"}>
              <Feather name="bell" size={28} color="black" />
            </OptionIcon> */}
            <OptionIcon onPress={handleViewAddGoal} text={"Add Daily Goal"}>
              <Entypo name="flag" size={28} color="black" />
            </OptionIcon>
          </View>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.backdrop}></View>
          </TouchableWithoutFeedback>
          <TouchableOpacity></TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.addIconContainer}
        onPress={() => setVisible(!visible)}
      >
        {visible ? (
          <Feather name="x" size={40} color="white" />
        ) : (
          <Ionicons name="add" size={40} color="white" />
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,.15)",
    zIndex: 1,
  },
  addIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 30,
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#0064e5",
    shadowRadius: 4,
    shadowColor: "rgba(34, 34, 34, 0.58)",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 4,
    },
    zIndex: 2,
  },
  iconsContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    bottom: 100,
    height: 250,
    width: 200,
    right: 20,
    zIndex: 3,
  },
});
