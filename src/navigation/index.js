import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useContext, useCallback } from "react";
import { AuthContext } from "../context/auth-context";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
// import SplashScreen from "../components/UI/SplashScreen";
import * as SplashScreenDefault from "expo-splash-screen";

SplashScreenDefault.preventAutoHideAsync();

export default function Navigation() {
  const { user, appIsReady } = useContext(AuthContext);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreenDefault.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <View
        style={{
          display: "flex",
          flex: 1,
          height: "100%",
          position: "absolute",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onLayout={onLayoutRootView}
      />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
