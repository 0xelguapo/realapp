import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

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
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle}></View>
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.company}>{company}</Text>
        <View style={styles.optionsContainer}>
          <Pressable>
            <TouchableHighlight underlayColor="#f1f1f1">
              <View style={styles.optionIconContainer}>
                <AntDesign name="staro" size={24} color="#535353" />
                <Text style={styles.optionText}>FAVORITE</Text>
              </View>
            </TouchableHighlight>
          </Pressable>
          <Pressable>
            <TouchableHighlight underlayColor="#f1f1f1">
              <View style={styles.optionIconContainer}>
                <AntDesign name="contacts" size={24} color="#535353" />
                <Text style={styles.optionText}>CONTACT</Text>
              </View>
            </TouchableHighlight>
          </Pressable>
          <Pressable>
            <TouchableHighlight underlayColor="#f1f1f1">
              <View style={styles.optionIconContainer}>
                <Feather name="edit-2" size={24} color="#535353" />
                <Text style={styles.optionText}>EDIT</Text>
              </View>
            </TouchableHighlight>
          </Pressable>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.detailsContainer}>
          <View style={styles.blockHeadingContainer}>
            <Text style={styles.blockHeadingText}>Notes</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 30,
  },
  rectangleContainer: {
    display: "flex",
    alignItems: "center",
  },
  rectangle: {
    top: 10,
    justifyContent: "center",
    width: 75,
    height: 7,
    borderRadius: 10,
    backgroundColor: "#c7c7c7",
  },
  header: {
    flex: 0.15,
    paddingTop: 40,
  },
  headerBottom: {
    marginTop: 10,
    justifyContent: "space-around",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#454545",
  },
  company: {
    color: "#6c6c6c",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
  },
  optionIconContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: 65,
  },
  optionText: {
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 5,
    color: "#535353",
  },
  body: {
    display: "flex",
    marginTop: 30,
  },
  blockHeadingText: {
    color: "#ababab",
    paddingBottom: 5,
    letterSpacing: 2,
    fontSize: 12,
  },
  blockHeadingContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: "#ababab",
  },
});
