import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { AuthProvider } from "./src/context/auth-context"
import Navigation from "./src/navigation/index";

Amplify.configure(awsconfig);

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
