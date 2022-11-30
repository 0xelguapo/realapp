import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseClient from "../../components/client/ChooseClient";
import AddDeal from "./AddDeal";
import DealsHome from "./DealsHome";

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
        name="AddDeal"
        component={AddDeal}
      />
      <Stack.Screen
        options={{ headerShown: false, presentation: "modal" }}
        name="SelectClient"
        component={ChooseClient}
      />
    </Stack.Navigator>
  );
}
