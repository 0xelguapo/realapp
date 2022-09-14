import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddReminder from "../home/AddReminder";
import More from "./More";
import AddNote from "./AddNote";
import ViewGroups from "./ViewGroups";

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
        options={{ presentation: "modal", headerShown: false }}
        name="ViewGroups"
        component={ViewGroups}
      />
    </Stack.Navigator>
  );
}
