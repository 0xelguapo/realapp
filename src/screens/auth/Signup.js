import { useState, useContext } from "react";
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
  ActivityIndicator,
  TouchableHighlight
} from "react-native";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utility/validators";
import { AuthContext } from "../../context/auth-context";
import Input from "../../components/Input";
import useForm from "../../hooks/form-hook";

export default function Signup({ navigation }) {
  const { signup, resend, confirmation, signin, isLoading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
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

  const handleSignup = async () => {
    const result = await signup(
      formState.inputs.email.value,
      formState.inputs.password.value
    );
    setShowModal(!showModal);
  };

  const handleConfirmation = async () => {
    let result;
    result = await confirmation(formState.inputs.email.value, confirmationText);
    result = await signin(
      formState.inputs.email.value,
      formState.inputs.password.value
    );
  };

  const handleResend = async () => {
    const result = await resend(formState.inputs.email.value);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={{ fontWeight: "500", marginBottom: 20 }}>
          Welcome! Please enter your details
        </Text>
        <Modal
          animationType="slide"
          visible={showModal}
          transparent={false}
          presentationStyle="pageSheet"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Verify Your Email</Text>
            <Text
              style={{ marginTop: 10, marginBottom: 10, textAlign: "center" }}
            >
              Please enter the confirmation code sent to{" "}
              <Text style={{ fontWeight: "600" }}>
                {formState.inputs.email.value}
              </Text>
            </Text>
            <TextInput
              style={styles.confirmationInput}
              keyboardType="numeric"
              value={confirmationText}
              onChangeText={(newText) => setConfirmationText(newText)}
            />
            <Text style={styles.resendHelper}>
              Don't see the email? Check your spam folder
            </Text>
            <Text style={styles.resend} onPress={handleResend}>
              Or resend email
            </Text>
            <TouchableHighlight style={styles.button} onPress={handleConfirmation}>
              <Text style={styles.buttonText}>
                {isLoading ? (<ActivityIndicator size="small" />) : ('Confirm')}
              </Text>
            </TouchableHighlight>
            <Button title="Go back" onPress={() => setShowModal(!showModal)} />
          </View>
        </Modal>
        <Input
          nativeID="email"
          onInput={inputHandler}
          helperText={"Email"}
          validators={[VALIDATOR_EMAIL()]}
          errorText={"Please enter a valid email!"}
          keyboardType="email-address"
        />
        <Input
          nativeID="password"
          onInput={inputHandler}
          helperText={"Password (min. 8 char)"}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
          errorText={"Please enter a password longer than 8 characters"}
          secureTextEntry={true}
        />
        <Pressable
          style={
            formState.isValid
              ? styles.button
              : { ...styles.button, ...styles.buttonDisabled }
          }
          disabled={!formState.isValid}
          onPress={handleSignup}
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
    marginTop: 10,
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
