import { Text, View, StyleSheet, Pressable, Animated } from "react-native";

export default function AddOptions(props) {
  const { goBack } = props.navigation;
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack} style={styles.backdrop}></Pressable>
      <View style={styles.modalContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 18,
  },
});
