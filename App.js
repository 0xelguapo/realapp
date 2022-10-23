import { StyleSheet, Text, View } from "react-native";
import Purchases from 'react-native-purchases'
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { AuthProvider } from "./src/context/auth-context";
import Navigation from "./src/navigation/index";
import { useEffect } from "react";
import {RC_API_KEY} from './src/constants/index'

import * as SplashScreenDefault from "expo-splash-screen";

SplashScreenDefault.preventAutoHideAsync();

Amplify.configure(awsconfig);

export default function App() {

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.configure({
      apiKey: RC_API_KEY,
    });
  }, []);


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
