import { StyleSheet, View, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container} >
      <Image
        style={styles.logo}
        source={require("../../../assets/splash.png")}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 500,
    height: 500,
  }
});
