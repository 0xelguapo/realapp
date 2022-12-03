import { View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";

export default function Deal({ deal, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{deal.title}</Text>
      </View>
      <Text style={styles.detailsText}>
        {deal?.amount ? `$${parseInt(deal.amount).toLocaleString()} ` : "$0"}
        {deal.clientId.length > 0 &&
          `• ${deal.client.firstName + " " + deal.client?.lastName}`}
      </Text>
    </TouchableOpacity>
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
