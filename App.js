import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { AuthProvider, AuthContext } from "./context/auth-context";
import Clients from "./components/pages/Clients";
import Tasks from "./components/pages/Tasks";
import Welcome from "./components/auth/Welcome";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

Amplify.configure(awsconfig);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerStyle: { backgroundColor: "#f9f9f9" },
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="Clients" component={Clients} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
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
