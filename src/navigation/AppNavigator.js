import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ClientContextProvider } from "../context/client-context";
import ClientsNavigator from "../screens/clients/index";
import TasksNavigator from "../screens/tasks";
import Settings from "../screens/settings/index";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <ClientContextProvider>
      <Tab.Navigator screenOptions={{ tabBarStyle: styles }}>
        <Tab.Screen
          name="Clients"
          component={ClientsNavigator}
          options={optionsHandler}
        />
        <Tab.Screen
          name="Tasks"
          component={TasksNavigator}
          options={optionsHandler}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={optionsHandler}
        />
      </Tab.Navigator>
    </ClientContextProvider>
  );
}

const styles = {
  padding: 3,
  shadowColor: "rgba(34, 34, 34, 0.58)",
  shadowOffset: {
    width: 1,
    height: 3,
  },
  shadowRadius: 4,
  shadowOpacity: 0.7,
};

const optionsHandler = ({ route }) => {
  switch (route.name) {
    case "Clients":
      return {
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ fontSize: 11, color: "#0064e5", fontWeight: "600" }}>
              {route.name}
            </Text>
          ) : (
            <Text style={{ fontSize: 11, color: "#878787" }}>{route.name}</Text>
          ),
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Ionicons name="people" size={28} color="#0064e5" />
          ) : (
            <Ionicons name="people" size={28} color="#878787" />
          ),
        headerShown: false,
      };
    case "Tasks":
      return {
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ fontSize: 11, color: "#0064e5", fontWeight: "600" }}>
              {route.name}
            </Text>
          ) : (
            <Text style={{ fontSize: 11, color: "#878787" }}>{route.name}</Text>
          ),
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={28}
              color="#0064e5"
            />
          ) : (
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={28}
              color="#878787"
            />
          ),
        headerShown: false,
      };
    case "Settings":
      return {
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ fontSize: 11, color: "#0064e5", fontWeight: "600" }}>
              {route.name}
            </Text>
          ) : (
            <Text style={{ fontSize: 11, color: "#878787" }}>{route.name}</Text>
          ),
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Feather name="settings" size={28} color="#0064e5" />
          ) : (
            <Feather name="settings" size={28} color="#878787" />
          ),
        headerShown: false,
      };
  }
};
