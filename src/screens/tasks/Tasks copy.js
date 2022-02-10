import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Tasks({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <View style={styles.iconBackground}></View>
        <View style={styles.addIconContainer}>
          <Ionicons
            name="md-add-circle"
            size={50}
            color="#0064e5"
            onPress={() => navigation.navigate("AddTask")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  headerContainer: {
    flex: .05,
    paddingTop: 70,
    paddingBottom: 25,
    paddingHorizontal: 20,
    backgroundColor: "#212121",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#e9e9e9",
  },
  addIconContainer: {
    position: "absolute",
    justifyContent: "center",
    right: 25,
    top: 65,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  iconBackground: {
    position: "absolute",
    top: 80,
    right: 40,
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: "#e9e9e9",
  },
});
