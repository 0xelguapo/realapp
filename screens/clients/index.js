import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Clients from "./Clients";
import AddClient from "./AddClient";

export default function ClientsNavigator({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Clients"
        component={Clients}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="AddClient"
        component={AddClient}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
});
