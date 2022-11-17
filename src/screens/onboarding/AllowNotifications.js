import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

export default function AllowNotifications(props) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const { handleSetExpoToken, signin } = useContext(AuthContext);
  const { userId, formState } = props.route.params;

  const timeout = () => {
    setTimeout(() => {
      registerForPushNotificationsAsync()
        .then((token) => {
          handleSetExpoToken(userId, token);
          setExpoPushToken(token);
        })
        .then(() => signin(formState.email.value, formState.password.value));
    }, 1000);
  };

  useEffect(() => {
    timeout();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingTitle}>Stay Updated</Text>
        <Text style={styles.headingSubtext}>
          We'll remind you of important tasks, dates, and events.
        </Text>
      </View>
      <LottieView
        autoPlay
        loop
        style={{ width: 100, height: 100, position: "absolute", top: "25%" }}
        source={require("../../../assets/bell.json")}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/allownotifs.png")}
          style={styles.image}
        />
        <LottieView
          autoPlay
          loop
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            right: 10,
            bottom: -10,
          }}
          source={require("../../../assets/fingerpoint.json")}
        />
      </View>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: null,
        experienceId: null,
      })
    ).data;
  }
  return token;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  headingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 120,
  },
  headingTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
  },
  headingSubtext: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 1,
  },
  imageContainer: {},
  image: {
    resizeMode: "contain",
    width: 300,
    height: 200,
  },
});
