import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddReminder from "../home/AddReminder";
import More from "./More";
import AddNote from "./AddNote";
import ViewAllGroups from "./ViewAllGroups";
import ViewOneGroup from "./ViewOneGroup";
import ClientDetails from "../clients/ClientDetails";
import EditClientsOfGroup from "./EditClientsOfGroup";
import ViewAllReminders from "./ViewAllReminders";
import Settings from "./Settings";
import ContactsToImport from "./ContactsToImport";
import AddConnectionHistory from "../clients/AddConnectionHistory";
import AddEditNote from "../clients/AddEditNote";
import AddClientTask from '../clients/AddClientTask'
import EditClient from "../clients/EditClient";

const Stack = createNativeStackNavigator();

export default function MoreNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="MoreHome"
        component={More}
      />
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="AddNote"
        component={AddNote}
      />
      <Stack.Screen
        options={{
          presentation: "modal",
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="AddReminder"
        component={AddReminder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ViewAllGroups"
        component={ViewAllGroups}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="ViewOneGroup"
        component={ViewOneGroup}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClientDetails"
        component={ClientDetails}
      />
            <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          cardOverlayEnabled: true,
          animation: "fade",
        }}
        name="AddConnectionHistory"
        component={AddConnectionHistory}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          cardOverlayEnabled: true,
          animation: "fade",
        }}
        name="AddEditNote"
        component={AddEditNote}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          cardOverlayEnabled: true,
          animation: "fade",
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
        options={{ presentation: "modal", headerShown: false }}
        name="EditClientsOfGroup"
        component={EditClientsOfGroup}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ViewAllReminders"
        component={ViewAllReminders}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ContactsToImport"
        component={ContactsToImport}
      />
    </Stack.Navigator>
  );
}
