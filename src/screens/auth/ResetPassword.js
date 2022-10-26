import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/auth-context";

export default function ResetPassword(props) {
  const {
    handleForgotPassword,
    handleCodeForForgotPassword,
    signin,
    isLoading,
  } = useContext(AuthContext);
  const { emailValue } = props.route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [email, setEmail] = useState(emailValue);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEnterEmail = async () => {
    if (!email) {
      Alert.alert("Please enter a valid email");
    }
    if (!showCode) {
      const response = await handleForgotPassword(email);
      if (!response) Alert.alert("Account not found or email is invalid.");
      if (response) setShowCode(true);
    } else if (showCode) {
      if (password !== confirmPassword)
        Alert.alert("Passwords don't match, please check!");
      if (password.length < 8)
        Alert.alert("Please enter at least 8 characters for your password!");
      else if (password === confirmPassword && verificationCode) {
        let response = await handleCodeForForgotPassword(
          email,
          verificationCode,
          password
        );
        if (response === "SUCCESS") {
          await signin(email, password);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      {!showCode && (
        <>
          <Text style={styles.subTitle}>Please enter your email</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.helperText}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </>
      )}
      {showCode && (
        <>
          <Text style={styles.subTitle}>
            Please check your email for your verification code, then enter a new
            password.
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.helperText}>Verification Code</Text>
            <TextInput
              style={styles.textInput}
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.helperText}>New Password</Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.helperText}>Confirm New Password</Text>
            <TextInput
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>
        </>
      )}
      <Pressable style={styles.button} onPress={handleEnterEmail}>
        <Text style={styles.buttonText}>
          {isLoading ? <ActivityIndicator size="small" /> : "Continue"}
        </Text>
      </Pressable>
    </View>
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
  subTitle: {
    fontWeight: "500",
  },
  inputContainer: {
    marginTop: 15,
  },
  helperText: {
    fontWeight: "600",
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingLeft: 10,
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
});
