import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddClient from "../clients/AddClient";
import Add from "./Add.js";
import AddTask from "../tasks/AddTask";

const Stack = createNativeStackNavigator();

export default function AddNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
          cardOverlayEnabled: true,
        }}
        name="Add"
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
