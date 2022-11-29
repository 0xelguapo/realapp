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
import PropertyDetails from "../properties/PropertyDetails";
import AddOwner from "../properties/AddOwner";
import AddPropertyTask from "../properties/AddPropertyTask";
import AddEditPropertyGroup from "../properties/AddEditPropertyGroup";
import EditProperty from "../properties/EditProperty";
import AddProperty from "../properties/AddProperty";
import ViewAllGroups from "../more/ViewAllGroups";
import ViewOneGroup from "../more/ViewOneGroup";
import EditClientsOfGroup from "../more/EditClientsOfGroup";
import AddClientsToGroup from "./AddClientsToGroup";

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
      <Stack.Screen
        options={{ headerShown: false }}
        name="PropertyDetails"
        component={PropertyDetails}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="AddProperty"
        component={AddProperty}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="EditProperty"
        component={EditProperty}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "slide_from_bottom",
        }}
        name="AddEditPropertyGroup"
        component={AddEditPropertyGroup}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="AddOwner"
        component={AddOwner}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          cardOverlayEnabled: true,
          animation: "fade",
        }}
        name="AddPropertyTask"
        component={AddPropertyTask}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ViewAllGroups"
        component={ViewAllGroups}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="ViewOneGroup"
        component={ViewOneGroup}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="EditClientsOfGroup"
        component={EditClientsOfGroup}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="AddClientsToGroup"
        component={AddClientsToGroup}
      />
    </Stack.Navigator>
  );
}
