import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ClientContextProvider } from "../context/client-context";
import { TaskContextProvider } from "../context/task-context";
import HomeNavigator from "../screens/home";
import ClientsNavigator from "../screens/clients";
import TasksNavigator from "../screens/tasks";
import Settings from "../screens/settings";
import Home from "../screens/home/Home";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import store from "../redux/index";
import { Provider } from "react-redux";
import { RemindersContextProvider } from "../context/reminder-context";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Provider store={store}>
      <ClientContextProvider>
        <TaskContextProvider>
          <RemindersContextProvider>
            <Tab.Navigator screenOptions={{ tabBarStyle: styles }}>
              <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={optionsHandler}
              />
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
          </RemindersContextProvider>
        </TaskContextProvider>
      </ClientContextProvider>
    </Provider>
  );
}

const styles = {
  paddingVertical: 5,
  shadowColor: "rgba(34, 34, 34, 0.2)",
  shadowOffset: {
    width: 1,
    height: 3,
  },
  shadowRadius: 5,
  shadowOpacity: 0.4,
  backgroundColor: "#f0f0f0",
};

const optionsHandler = ({ route }) => {
  switch (route.name) {
    case "Home":
      return {
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ fontSize: 11, color: "#0064e5", fontWeight: "600" }}>
              {route.name}
            </Text>
          ) : (
            <Text style={{ fontSize: 11, color: "#727272" }}>{route.name}</Text>
          ),
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Feather name="home" size={25} color="#0064e5" />
          ) : (
            <Feather name="home" size={25} color="#727272" />
          ),
        headerShown: false,
      };
    case "Clients":
      return {
        tabBarLabel: ({ focused }) =>
          focused ? (
            <Text style={{ fontSize: 11, color: "#0064e5", fontWeight: "600" }}>
              {route.name}
            </Text>
          ) : (
            <Text style={{ fontSize: 11, color: "#727272" }}>{route.name}</Text>
          ),
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Ionicons name="people" size={28} color="#0064e5" />
          ) : (
            <Ionicons name="people" size={28} color="#727272" />
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
            <Text style={{ fontSize: 11, color: "#727272" }}>{route.name}</Text>
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
              color="#727272"
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
            <Text style={{ fontSize: 11, color: "#727272" }}>{route.name}</Text>
          ),
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Feather name="settings" size={28} color="#0064e5" />
          ) : (
            <Feather name="settings" size={28} color="#727272" />
          ),
        headerShown: false,
      };
  }
};
