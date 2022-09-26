import { StyleSheet, View, Text, Pressable } from "react-native";

export default function BlockHeading({ title, onPress }) {
  return (
    <View style={styles.blockHeadingContainer}>
      <Text style={styles.blockHeadingText}>{title}</Text>
      {onPress && (
        <Pressable onPress={onPress}>
          <Ionicons name="add-circle-outline" size={20} color="#ababab" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  blockHeadingText: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 12,
    paddingVertical: 5,
  },
  blockHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    borderBottomColor: "#ababab",
  },
});
