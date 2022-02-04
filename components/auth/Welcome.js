import {
  StyleSheet,
  Text,
  View,
  Pressable
} from "react-native";
import LottieView from "lottie-react-native";

export default function Welcome({ navigation }) {

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        style={{ width: 250, height: 250 }}
        source={require("../../assets/welcome.json")}
      />
      <Text style={styles.title}>#1 CRM for Agents</Text>
      <Text style={styles.subText}>The client management tool made by agents, for agents</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate('Signup')}>Create an Account</Text>
      </Pressable>
      <Text style={styles.login} onPress={() => navigation.navigate('Login')}>Existing User? Log In here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: "100%",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    marginTop: 50
  },
  subText: {
    textAlign: 'center',
    marginTop: 20
  },
  button: {
    marginTop: 30,
    height: 60,
    backgroundColor: '#171717',
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18
  },
  login: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: '500'
    
  }
});
