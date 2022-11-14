import { View, StyleSheet, Animated, Text } from "react-native";
import {
  GestureDetector,
  useAnimatedStyle,
} from "react-native-gesture-handler";

export default function Goal() {
  return (
    <GestureDetector>
      <Animated.View style={[styles.ball]} />
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "blue",
    alignSelf: "center",
  },
});
