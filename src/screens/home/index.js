import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddClient from "../clients/AddClient";
import AddReminder from "./AddReminder";
import AddTask from "../tasks/AddTask";
import Home from "./Home";
import EditReminder from "../clients/EditReminder";
import Paywall from "../../components/UI/Paywall";
import Overdue from "./Overdue";
import ClientDetails from "../clients/ClientDetails";
import AddGoal from "./AddGoal";

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
        options={{ headerShown: false, presentation: "transparentModal" }}
        name="Paywall"
        component={Paywall}
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
          animation: "fade",
        }}
        name="EditReminder"
        component={EditReminder}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          cardOverlayEnabled: true,
        }}
        name="Overdue"
        component={Overdue}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ClientDetails"
        component={ClientDetails}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "modal",
          cardOverlayEnabled: true,
        }}
        name="AddGoal"
        component={AddGoal}
      />
    </Stack.Navigator>
  );
}
