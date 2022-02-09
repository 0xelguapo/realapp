import { StyleSheet, View, Text } from "react-native";

export default function EachClient({ name, phone, company, email }) {
  const formattedPhone =
    phone.length <= 10
      ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      : `+${phone.slice(0,1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 11)}`;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.company}>{company}</Text>
      <Text style={styles.phone}>{formattedPhone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    height: 100,
    borderBottomWidth: .5,
    borderBottomColor: '#e6e6e6'
  },
  name: {
    fontWeight: "600",
    fontSize: 19,
  },
  company: {

  }

});
