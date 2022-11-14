import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImportContacts from "./ImportContacts";

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="ImportContacts"
        component={ImportContacts}
      />
    </Stack.Navigator>
  );
}
