import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tasks from "./Tasks";
import AddTask from "./AddTask";

const Stack = createNativeStackNavigator();

export default function TasksNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AllTasks"
        component={Tasks}
      />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="AddTask"
        component={AddTask}
      />
    </Stack.Navigator>
  );
}
