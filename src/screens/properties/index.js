import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import PropertyDetails from "./PropertyDetails";

const Stack = createNativeStackNavigator();

export default function PropertiesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AllProperties"
        component={AllProperties}
      />
       <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="AddProperty"
        component={AddProperty}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="PropertyDetails"
        component={PropertyDetails}
      />
    </Stack.Navigator>
  );
}
