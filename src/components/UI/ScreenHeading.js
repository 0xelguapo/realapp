import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ScreenHeading({ handleGoBack, screenTitle }) {
  return (
    <View style={styles.headingContainer}>
      <TouchableOpacity style={styles.backIconContainer} onPress={handleGoBack}>
        <AntDesign name="left" size={24} color="#ababab" />
      </TouchableOpacity>
      <Text style={styles.screenTitle}>{screenTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingTop: 65,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginBottom: 5,
  },
  backIconContainer: {
    position: "absolute",
    left: 20,
    top: 65,
  },
  screenTitle: {
    fontWeight: "500",
    fontSize: 20,
    marginLeft: 5,
  },
});
