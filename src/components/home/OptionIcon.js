import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProIcon from "../UI/ProIcon";

export default function OptionIcon({ onPress, text, children, pro = false }) {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
      <View style={styles.iconTextContainer}>
        {pro && <ProIcon top={-12} left={-15} />}
        <Text style={styles.iconText}>{text}</Text>
      </View>
      <View style={styles.icon}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconTextContainer: {
    backgroundColor: "white",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "500",
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
