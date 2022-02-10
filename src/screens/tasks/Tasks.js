import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Tasks({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Tasks</Text>
        </View>
        <View style={styles.addIconContainer}>
          <View style={styles.addIconBackground}></View>
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
    flex: 0.1,
    paddingTop: 55,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: "#212121",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#e9e9e9",
  },
  addIconBackground: {
    position: "absolute",
    top: 15,
    right: 15,
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: "#e9e9e9",
  },
});
