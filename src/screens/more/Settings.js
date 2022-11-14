import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import * as Linking from "expo-linking";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { deleteUserData } from "../../graphql/mutations";
import { AntDesign } from '@expo/vector-icons'

export default function Settings(props) {
  const { signOut, user } = useContext(AuthContext);
  const [confirmDeleteText, setConfirmDeleteText] = useState();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          signOut();
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Deleting your account is irreversible. All data will be deleted and NOT recoverable. The action is immediate and permanent.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "CONFIRM DELETE ACCOUNT",
          style: "destructive",
          onPress: async () => {
            let response;
            try {
              response = await API.graphql(graphqlOperation(deleteUserData));
              console.log(response);
            } catch (err) {
              console.error(err);
            }
            if (response.data.deleteUserData) {
              console.log(response);
              await Auth.deleteUser();
              await signOut();
            }
          },
        },
      ],
      "plain-text"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={props.navigation.goBack}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headingText}>Settings</Text>
      </View>
      <View style={styles.bodyContainer}>
      <View style={{ ...styles.buttonsBlock, marginTop: 0,}}>
          <TouchableOpacity
            style={{ ...styles.buttonContainer, marginTop: 0 }}
            onPress={() => props.navigation.navigate('ContactsToImport')}
          >
            <Text style={styles.buttonText}>Import Contacts</Text>
          </TouchableOpacity>
        </View>

        <View style={{ ...styles.buttonsBlock }}>
          <TouchableOpacity
            style={{ ...styles.buttonContainer, marginTop: 0 }}
            onPress={() => Linking.openURL("https://coagent.co")}
          >
            <Text style={styles.buttonText}>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => Linking.openURL("https://coagent.co/privacy-policy")}
          >
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => Linking.openURL("https://coagent.co/terms-of-use")}
          >
            <Text style={styles.buttonText}>Terms Of Use</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsBlock}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  headingContainer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingBottom: 15,
    zIndex: 3,
    paddingTop: 20,
  },
  headingText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#454545",
  },
  backButtonContainer: {
    paddingBottom: 10
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonsBlock: {
    marginTop: 30,
  },
  buttonContainer: {
    backgroundColor: "#f4f4f4",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#454545",
    fontWeight: "600",
  },
  deleteText: {
    color: "#dbdbdb",
    fontWeight: "600",
  },
});
