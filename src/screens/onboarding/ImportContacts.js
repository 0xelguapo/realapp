import { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import LottieView from "lottie-react-native";
import * as Contacts from "expo-contacts";

export default function ImportContacts(props) {
  const { userId, formState } = props.route.params;

  const getContactPermissions = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.Birthday,
          Contacts.Fields.Company,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.JobTitle,
          Contacts.Fields.Addresses,
        ],
      });
      if (data.length > 0) {
        const contact = data[5];
      }
    }
    if (status) {
      props.navigation.navigate("AllowNotifications", { userId, formState });
    }
  };

  const timeout = () => {
    setTimeout(() => {
      getContactPermissions();
    }, 1500);
  };

  useEffect(() => {
    timeout();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>Import Contacts?</Text>

          <Text style={styles.headingSubtext}>
            {" "}
            You can choose who to upload later!
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <LottieView
            autoPlay
            loop
            style={{ width: 400, height: 400, position: "absolute", top: 0 }}
            source={require("../../../assets/abstractblue.json")}
          />
          <Image
            source={require("../../../assets/allowcontacts.png")}
            style={styles.image}
          />
          <LottieView
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              bottom: 0,
              right: -15,
            }}
            source={require("../../../assets/fingerpoint.json")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: "40%",
  },
  innerContainer: {
    width: "70%",
  },
  headingContainer: {},
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
  imageContainer: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 90,
  },
  image: {
    resizeMode: "contain",
    width: 280,
    height: 200,
  },
});
