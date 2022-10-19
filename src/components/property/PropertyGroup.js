import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function PropertyGroup({ propertyGroup, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{propertyGroup.title}</Text>
        {propertyGroup.properties?.length ? (
          <View style={styles.lengthContainer}>
            <Text style={styles.lengthText}>{propertyGroup.properties.length}</Text>
            <FontAwesome name="building-o" size={10} color="#727272" />
          </View>
        ) : (
          <View style={styles.lengthContainer}>
            <Text style={styles.lengthText}>0</Text>
            <FontAwesome name="building-o" size={10} color="#727272" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderWidth: 0.8,
    height: 60,
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 5,
  },
  title: {
    fontWeight: "600",
    marginBottom: 3,
  },
  lengthContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },
  lengthText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
    marginRight: 3,
  },
});
