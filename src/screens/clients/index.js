import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllClients from "./AllClients";
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";
import AddConnectionHistory from "./AddConnectionHistory";
import AddEditNote from "./AddEditNote.js";
import AddClientTask from "./AddClientTask.js";
import EditClient from "./EditClient";
import AddEditGroup from "./AddEditGroup";
import EditReminder from "./EditReminder";

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
        options={{ headerShown: false }}
        name="ClientDetails"
        component={ClientDetails}
      />
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="AddConnectionHistory"
        component={AddConnectionHistory}
      />
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="AddEditNote"
        component={AddEditNote}
      />
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="AddClientTask"
        component={AddClientTask}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="EditClient"
        component={EditClient}
      />
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="AddEditGroup"
        component={AddEditGroup}
      />
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
          animation: "fade",
        }}
        name="EditReminder"
        component={EditReminder}
      />
    </Stack.Navigator>
  );
}
