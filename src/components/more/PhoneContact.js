import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function PhoneContact({
  firstName,
  lastName,
  company,
  onPress,
}) {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    if (!checked) onPress();
    setChecked(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}></View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>
          {lastName ? firstName + " " + lastName : firstName}
        </Text>
        {company?.length > 0 && (
          <Text style={styles.companyText}>{company}</Text>
        )}
      </View>
      <TouchableOpacity
        style={
          !checked
            ? styles.addContainer
            : {
                ...styles.addContainer,
                backgroundColor: "#f9f9f9",
                borderWidth: 0.5,
              }
        }
        onPress={handlePress}
      >
        {checked ? (
          <Text style={styles.addedText}>Added</Text>
        ) : (
          <Text>Add</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "",
    height: 60,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
  },
  detailsContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "500",
  },
  companyText: {
    color: "#6c6c6c",
  },
  addContainer: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#e6e6e6",
  },
});
