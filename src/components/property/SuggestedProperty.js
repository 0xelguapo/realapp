import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";

export default function SuggestedProperty({ item, handlePress, buttonText }) {
  return (
    <View style={styles.searchResultContainer}>
      <View style={styles.searchResultTextContainer}>
        <Text style={styles.searchResultTitle}>
          {item.addressNumber
            ? item.addressNumber + " " + item.street
            : item.street}
        </Text>
        <Text style={styles.searchResultSubtitle}>
          {item?.municipality + ", " + item?.region + " " + item?.postalCode}
        </Text>
      </View>
      {item.add !== false && (
        <TouchableOpacity
          style={styles.searchAddContainer}
          onPress={() => handlePress(item)}
        >
          <Text style={styles.searchAddText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchResultContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchResultTextContainer: {
    flex: 1,
  },
  searchResultTitle: {
    fontWeight: "500",
    color: "#454545",
  },
  searchResultSubtitle: {
    fontWeight: "300",
    color: "#6c6c6c",
  },
  searchAddContainer: {
    width: 50,
  },
  searchAddText: {
    fontWeight: "500",
    color: "#0064e5",
  },
});
