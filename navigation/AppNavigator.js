import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Clients from "../screens/pages/Clients";
import Tasks from "../screens/pages/Tasks";
import Settings from '../screens/settings/index';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Clients" component={Clients} />
            <Tab.Screen name="Tasks" component={Tasks} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}