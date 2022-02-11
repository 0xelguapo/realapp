import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Clients from "./Clients";
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";

const Stack = createNativeStackNavigator();

export default function ClientsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AllClients"
        component={Clients}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="AddClient"
        component={AddClient}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="ClientDetails"
        component={ClientDetails}
      />
    </Stack.Navigator>
  );
}