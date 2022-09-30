import { Animated, View, Text, StyleSheet } from "react-native";
import { useEffect, useContext, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SuccessContext } from "../../context/success-context";

export default function SuccessMessage(props) {
  const { fadeAnim, text } = useContext(SuccessContext);

  return (
    <>
      <Animated.View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
        <View style={styles.iconContainer}>
          <AntDesign name="checkcircleo" size={14} color="#1761b8" />
        </View>
        <Text style={styles.successText}>{text}</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  fadingContainer: {
    flex: 1,
    position: "absolute",
    top: 60,
    zIndex: 2,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#dae5f2",
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    color: "#1761b8",
    fontWeight: "600",
    fontSize: 12,
  },
});
