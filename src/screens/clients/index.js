import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllClients from "./AllClients";
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";
import AddClientDetails from "./AddClientDetails";

const Stack = createNativeStackNavigator();

export default function ClientsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AllClients"
        component={AllClients}
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
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="AddClientDetails"
        component={AddClientDetails}
      />
    </Stack.Navigator>
  );
}
