import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Button,
  TextInput,
} from "react-native";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utility/validators";
import { Auth } from "aws-amplify";
import Input from "../Input";
import useForm from "../../hooks/form-hook";

export default function Login({ navigation }) {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSignin = async () => {
    let user;
    try {
      user = await Auth.signIn(
        formState.inputs.email.value,
        formState.inputs.password.value
      );
    } catch (err) {
      console.log("error", err);
    }
    console.log(user)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={{ fontWeight: "500", marginBottom: 20 }}>
          Sign in to your account
        </Text>
        <Input
          nativeID="email"
          onInput={inputHandler}
          helperText={"Email"}
          validators={[VALIDATOR_EMAIL()]}
          errorText={"Please enter a valid email!"}
        />
        <Input
          nativeID="password"
          onInput={inputHandler}
          helperText={"Password (min. 8 char)"}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
          errorText={"Please enter a password longer than 8 characters"}
        />
        <Pressable
          style={
            formState.isValid
              ? styles.button
              : { ...styles.button, ...styles.buttonDisabled }
          }
          disabled={!formState.isValid}
          onPress={handleSignin}
        >
          <Text
            style={
              formState.isValid
                ? styles.buttonText
                : { ...styles.buttonText, ...styles.buttonTextDisabled }
            }
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "100%",
    padding: 30,
  },
  textInput: {
    height: 35,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    paddingLeft: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#171717",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  buttonDisabled: {
    backgroundColor: "#787878",
  },
  buttonTextDisabled: {
    color: "#a6a6a6",
  },
  resendHelper: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
  resend: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
    color: "rgb(0, 122, 255)",
    textDecorationLine: "underline",
  },
  confirmationInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    paddingLeft: 10,
  },
});
