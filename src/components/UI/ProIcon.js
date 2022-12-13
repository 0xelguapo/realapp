import { View, Text, StyleSheet } from "react-native";

export default function ProIcon({ top, left, small = false, right }) {
  return (
    <View
      style={[
        styles.container,
        { top, left, right },
        small && { borderRadius: 50, paddingVertical: 3, paddingHorizontal: 3 },
      ]}
    >
      <Text style={[styles.text, small && { fontSize: 8 }]}>Pro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
    zIndex: 5
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});
