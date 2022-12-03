import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Group({ title, length = 0, onPress, icon }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.details}>
          <Text>
            {length > 0 ? (
              <Text style={styles.length}>{length}</Text>
            ) : (
              <Text style={styles.length}>0</Text>
            )}
          </Text>
          {icon}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderWidth: 0.8,
    height: 60,
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 5,
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 22,
  },
  title: {
    fontWeight: "600",
    marginBottom: 3,
  },
  length: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
  },
});
