import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ClientsNavigator from "../screens/clients/index";
import Tasks from "../screens/pages/Tasks";
import Settings from "../screens/settings/index";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

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

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: styles }}>
      <Tab.Screen
        name="Clients"
        component={ClientsNavigator}
        options={optionsHandler}
      />
      <Tab.Screen name="Tasks" component={Tasks} options={optionsHandler} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={optionsHandler}
      />
    </Tab.Navigator>
  );
}

const optionsHandler = ({ route }) => {
  switch (route.name) {
    case "Clients":
      return {
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ fontSize: 11, color: "black", fontWeight: "600" }}>
              {route.name}
            </Text>
          ) : (
            <Text style={{ fontSize: 11, color: "#878787" }}>{route.name}</Text>
          ),
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Ionicons name="people" size={28} color="black" />
          ) : (
            <Ionicons name="people" size={28} color="#878787" />
          ),
      };
    case "Tasks":
      return {
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ fontSize: 11, color: "black", fontWeight: "600" }}>
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
              color="black"
            />
          ) : (
            <MaterialCommunityIcons name="clipboard-list-outline" size={28} color="#878787" />
          ),
      };
    case "Settings":
      return {
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ fontSize: 11, color: "black", fontWeight: "600" }}>
              {route.name}
            </Text>
          ) : (
            <Text style={{ fontSize: 11, color: "#878787" }}>{route.name}</Text>
          ),
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Feather name="settings" size={28} color="black" />
          ) : (
            <Feather name="settings" size={28} color="#878787" />
          ),
      };
  }
};
