import { Pressable, Text, StyleSheet } from "react-native";

export default function CustomPressable({ children, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#171717",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
