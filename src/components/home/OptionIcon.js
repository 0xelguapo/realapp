import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function OptionIcon(props) {
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={props.onPress}
    >
      <View style={styles.iconTextContainer}>
        <Text style={styles.iconText}>{props.text}</Text>
      </View>
      <View style={styles.icon}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
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
