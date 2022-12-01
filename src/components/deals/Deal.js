import { View, StyleSheet, Text, Pressable } from "react-native";

export default function Deal({ deal, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{deal.title}</Text>
      </View>
      <Text style={styles.detailsText}>
        ${parseInt(deal.amount).toLocaleString()}{" "}
        {deal.clientId.length > 0 &&
          `• ${deal.client.firstName + " " + deal.client?.lastName}`}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    minHeight: 60,
    borderBottomColor: "#e6e6e6",
  },
  titleText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#454545",
  },

  detailsText: {
    marginTop: 5,
    fontWeight: "500",
    color: "#6c6c6c",
  },
});
