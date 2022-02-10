import { View, Text, StyleSheet } from "react-native";

export default function ClientDetails(props) {
  console.log("props", props.route.params.client);
  const { name, company, email, phone, properties, tasks, updatedAt } =
    props.route.params.client;

  const formattedPhone =
    phone.length <= 10
      ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      : `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(
          4,
          7
        )}-${phone.slice(7, 11)}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.company}>{company}</Text>
        <View style={styles.headerBottom}>
          <Text style={styles.phone}>{formattedPhone}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <View style={styles.body}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 0.15,
    paddingTop: 40,
    paddingHorizontal: 40,
    backgroundColor: "rgba(235, 240, 250, 1)",
  },
  headerBottom: {
    marginTop: 10,
    width: "100%",
    justifyContent: "space-around",
  },
  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#212121",
  },
  phone: {
    fontWeight: "400",
    color: "#4d4d4d",
  },
  email: {
    marginTop: 2,
    fontWeight: "400",
    color: "#4d4d4d",
  },
});
