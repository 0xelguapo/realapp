import { StyleSheet, Text, View } from "react-native";
import Purchases from "react-native-purchases";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { AuthProvider } from "./src/context/auth-context";
import Navigation from "./src/navigation/index";
import { useEffect } from "react";
import { RC_API_KEY } from "./src/constants/index";
import * as SplashScreenDefault from "expo-splash-screen";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

SplashScreenDefault.preventAutoHideAsync();

const isLocalHost = Boolean(__DEV__);

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

const { 4: localRedirectSignIn } = awsconfig.oauth.redirectSignIn.split(",");

const { 4: localRedirectSignOut } = awsconfig.oauth.redirectSignOut.split(",");

const updatedConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: localRedirectSignIn,
    redirectSignOut: localRedirectSignOut,
    urlOpener
  },
};
Amplify.configure(updatedConfig);

// Amplify.configure(awsconfig);

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
