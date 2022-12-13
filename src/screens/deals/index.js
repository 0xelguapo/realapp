import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseClient from "../clients/ChooseClient";
import DealsHome from "./DealsHome";
import ChooseProperty from "../properties/ChooseProperty";
import AddEditDeal from "./AddEditDeal";
import Paywall from "../../components/UI/Paywall";

const Stack = createNativeStackNavigator();

export default function DealsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="DealsHome"
        component={DealsHome}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="AddEditDeal"
        component={AddEditDeal}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="ChooseClient"
        component={ChooseClient}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="ChooseProperty"
        component={ChooseProperty}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "transparentModal" }}
        name="Paywall"
        component={Paywall}
      />
    </Stack.Navigator>
  );
}
