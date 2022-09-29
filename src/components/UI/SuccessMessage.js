import { Animated, View, Text, StyleSheet } from "react-native";
import { useEffect, useContext, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SuccessContext } from "../../context/success-context";

export default function SuccessMessage(props) {
  const { fadeAnim } = useContext(SuccessContext);

  return (
    <>
      <Animated.View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
        <AntDesign name="checkcircleo" size={14} color="#1761b8" />
        <Text style={styles.successText}>SUCCESS</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  fadingContainer: {
    position: "absolute",
    zIndex: 2,
    top: 60,
    padding: 3,
    backgroundColor: "#dae5f2",
    borderRadius: 20,
    width: 100,
    alignSelf: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  successText: {
    color: "#1761b8",
    fontWeight: "600",
    fontSize: 12,
  },
});
