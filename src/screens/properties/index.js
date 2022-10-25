import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import EditProperty from "./EditProperty";
import PropertyDetails from "./PropertyDetails";
import AddEditPropertyGroup from "./AddEditPropertyGroup";
import ClientDetails from "../clients/ClientDetails";
import AddOwner from "./AddOwner";
import AddPropertyTask from "./AddPropertyTask";

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
        options={{ headerShown: false }}
        name="PropertyDetails"
        component={PropertyDetails}
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
        options={{ headerShown: false, presentation: "transparentModal" }}
        name="ClientDetails"
        component={ClientDetails}
      />
       <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="AddOwner"
        component={AddOwner}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "transparentModal", cardOverlayEnabled: true, animation: "fade",  }}
        name="AddPropertyTask"
        component={AddPropertyTask}
      />
    </Stack.Navigator>
  );
}
