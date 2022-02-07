import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

export default function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
