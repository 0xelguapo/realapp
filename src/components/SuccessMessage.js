import { Animated, View, Text, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

export default function SuccessMessage({ children }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const onStatusChange = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 3000);
  };

  useEffect(() => {
    onStatusChange();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
        <Text style={styles.successText}>{children}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "95%",
    alignSelf: "center",
    bottom: 10,
    zIndex: 2,
  },
  fadingContainer: {
    padding: 10,
    backgroundColor: "#026bff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4e97ff",
  },
  successText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
