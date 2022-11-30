import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddButton({onPress, icon}) {
  return (
    <TouchableOpacity style={styles.addIconContainer} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  },
});
