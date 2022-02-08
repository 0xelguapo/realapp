import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from '../screens/auth/Welcome'
import Login from '../screens/auth/Login'
import Signup from '../screens/auth/Signup'

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
