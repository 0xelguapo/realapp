import { View, Text, StyleSheet } from "react-native";

export default function ClientDetails({id}) {
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
