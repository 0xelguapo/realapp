import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef, useContext } from "react";
import OptionIcon from "../home/OptionIcon";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import ProIcon from "./ProIcon";
import { AuthContext } from "../../context/auth-context";

export default function MultiAddButton({
  activeDate,
  showAddClient,
  showAddTask,
  showAddGoal,
  showAddProperty,
  pro,
}) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { isProUser } = useContext(AuthContext);

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
    if (!isProUser && pro) {
      navigation.navigate("Paywall");
    } else {
      navigation.navigate("AddClient");
    }
    setVisible(false);
  };

  const handleViewAddTask = () => {
    navigation.navigate("AddTask", { activeDate });
    setVisible(false);
  };

  const handleViewAddGoal = () => {
    if (!isProUser) {
      navigation.navigate("Paywall");
    } else {
      navigation.navigate("AddGoal");
    }
    setVisible(false);
  };

  const handleViewAddProperty = () => {
    navigation.navigate("AddProperty");
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <>
          <View style={styles.iconsContainer}>
            {showAddClient && (
              <OptionIcon
                onPress={handleViewAddClient}
                text={"Add Client"}
                pro={pro}
              >
                <Ionicons name="ios-person-add" size={28} color="black" />
              </OptionIcon>
            )}
            {showAddTask && (
              <OptionIcon onPress={handleViewAddTask} text={"Add Task"}>
                <Entypo name="add-to-list" size={28} color="black" />
              </OptionIcon>
            )}
            {showAddGoal && (
              <OptionIcon
                onPress={handleViewAddGoal}
                text={"Add Daily Goal"}
                pro={true}
              >
                <Entypo name="flag" size={28} color="black" />
              </OptionIcon>
            )}
            {showAddProperty && (
              <OptionIcon onPress={handleViewAddProperty} text={"Add Property"}>
                <Ionicons name="location" size={28} color="black" />
              </OptionIcon>
            )}
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
    zIndex: 2,
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
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 100,
    height: 250,
    width: 200,
    right: 20,
    zIndex: 3,
  },
});
