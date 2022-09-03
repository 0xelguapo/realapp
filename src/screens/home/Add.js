import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useRef, useEffect } from "react";

export default function AddOptions(props) {
  const { goBack } = props.navigation;
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
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={goBack}>
        <Animated.View
          style={{ ...styles.backdrop, opacity: fadeAnim }}
        ></Animated.View>
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column-reverse",
    height: "100%",
  },
  backdrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  modalContainer: {
    display: "flex",
    height: 400,
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 18,
  },
});
