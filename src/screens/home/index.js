import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddClient from "../clients/AddClient";
import AddReminder from "./AddReminder";
import AddTask from "../tasks/AddTask";
import Home from "./Home";
import EditReminder from "../clients/EditReminder";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="AddClient"
        component={AddClient}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="AddTask"
        component={AddTask}
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
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="EditReminder"
        component={EditReminder}
      />
    </Stack.Navigator>
  );
}
