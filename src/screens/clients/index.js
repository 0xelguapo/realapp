import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllClients from "./AllClients";
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";
import AddClientDetails from "./AddClientDetails";

const Stack = createNativeStackNavigator();

export default function ClientsNavigator() {
  const stackArray = [
    { name: "AllClients", component: AllClients },
    { name: "AddClient", component: AddClient },
    { name: "ClientDetails", component: ClientDetails },
    { name: "AddClientDetails", component: AddClientDetails },
  ];

  return (
    <Stack.Navigator>
      {stackArray.map((stack) => (
        <Stack.Screen
          name={stack.name}
          component={stack.component}
          options={{ presentation: "modal", headerShown: false }}
        />
      ))}
      {/* <Stack.Screen
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
        options={{ presentation: "modal", headerShown: false }}
        name="AddClientDetails"
        component={AddClientDetails}
      /> */}
    </Stack.Navigator>
  );
}
