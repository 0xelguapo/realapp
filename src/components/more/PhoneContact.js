import { Text, View, StyleSheet } from "react-native";

export default function PhoneContact({
  firstName,
  lastName,
  company,
  jobTitle,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.checkbox}></View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>{lastName ? firstName + " " + lastName : firstName}</Text>
        <Text style={styles.companyText}>{company}</Text>
      </View>
      <View style={styles.addContainer}>
        <Text>Add me</Text>
      </View>
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
  },
  detailsContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500'
  },
  companyText: {
    color: '#6c6c6c'
  }
});
