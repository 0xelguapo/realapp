import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function StickyHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.headingContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={25} color="#6c6c6c" />
      </TouchableOpacity>
      <Text style={styles.screenTitle}>New Goal</Text>
      <TouchableOpacity>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function AddGoal() {
  return (
    <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={[{ flex: 1 }]}>
      <StickyHeader />
      <View style={styles.container}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#f9f9f9",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  headingContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6c6c6c",
  },
  saveText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0064e5",
  },
});
