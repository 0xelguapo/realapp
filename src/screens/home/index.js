import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddClient from "../clients/AddClient";
import AddReminder from "./AddReminder";
import AddTask from "../tasks/AddTask";
import Home from "./Home";

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
    </Stack.Navigator>
  );
}
