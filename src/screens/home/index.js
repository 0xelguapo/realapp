import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddClient from "../clients/AddClient";
import Add from "./Add.js";
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
        options={{
          headerShown: false,
          presentation: "transparentModal",
          cardOverlayEnabled: true,
        }}
        name="AddOptions"
        component={Add}
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
    </Stack.Navigator>
  );
}
