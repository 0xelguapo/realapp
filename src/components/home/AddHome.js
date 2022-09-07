import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function AddHome() {
  const [visible, setVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      delay: 250,
      duration: 400,
    }).start();
  }, [fadeAnim]);

  return (
    <>
      {visible && (
        <>
          <View style={styles.iconsContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.iconTextContainer}>
                <Text style={styles.iconText}>Add Client</Text>
              </View>
              <View style={styles.icon}>
                <Ionicons name="ios-person-add" size={28} color="black" />
              </View>
            </View>
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
    zIndex: 3,
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
    zIndex: 3,
  },
  iconsContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    borderWidth: 3,
    bottom: 100,
    height: 200,
    width: 150,
    right: 20,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
