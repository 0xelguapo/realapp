import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function EditingClient({ id, name, company }) {
  return (
    <Pressable>
      <TouchableHighlight underlayColor="#f1f1f1">
        <View style={styles.container}>
          <View style={styles.checkContainer}>
            <Ionicons name="checkmark" size={30} color="#535353" />
          </View>
          <View style={styles.clientDetails}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.phone}>{company}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e6e6e6",
    width: "100%",
  },
  checkContainer: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  clientDetails: {
    width: "90%",
  },
  name: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 3,
  },
  company: {
    color: "#7b7b7c",
  },
  phone: {
    color: "#7b7b7c",
  },
});
