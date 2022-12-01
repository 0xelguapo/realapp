import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseClient from '../clients/ChooseClient'
import AddDeal from "./AddDeal";
import DealsHome from "./DealsHome";
import ChooseProperty from "../properties/ChooseProperty";

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
        name="ChooseClient"
        component={ChooseClient}
      />
      <Stack.Screen options={{headerShown: false, presentation: 'modal'}}
      name="ChooseProperty" component={ChooseProperty} />
    </Stack.Navigator>
  );
}
