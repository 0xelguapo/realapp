import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'

export default function PropertyGroup({ property }) {
  console.log(property)
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>hi</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 5,
    flexDirection: "row",
  },
  title: {
    fontWeight: '600',
    marginBottom: 3
  },
});
