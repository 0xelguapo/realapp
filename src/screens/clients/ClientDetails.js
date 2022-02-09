import { View, Text, StyleSheet } from "react-native";

export default function ClientDetails(props) {
    console.log('props', props.route.params.clientId)
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
