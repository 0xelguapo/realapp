import { StyleSheet, View, Text, Animated, Pressable, Button } from "react-native";

export default function AddClientDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.backdrop}></View>
      <View style={styles.inputsContainer}>
        <Text>Hi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  },
  backdrop: {
    backgroundColor: 'black',
    opacity: 0.15,
    height: 300
  }
});
