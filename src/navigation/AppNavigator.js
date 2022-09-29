import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ClientContextProvider } from "../context/client-context";
import { TaskContextProvider } from "../context/task-context";
import { RemindersContextProvider } from "../context/reminder-context";
import HomeNavigator from "../screens/home";
import ClientsNavigator from "../screens/clients";
import TasksNavigator from "../screens/tasks";
import MoreNavigator from "../screens/more";
import store from "../redux/index";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { GroupsContextProvider } from "../context/group-context";
import SuccessMessage from "../components/UI/SuccessMessage";
import { SuccessContextProvider } from "../context/success-context";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Provider store={store}>
      <ClientContextProvider>
        <TaskContextProvider>
          <RemindersContextProvider>
            <GroupsContextProvider>
              <SuccessContextProvider>
                <SuccessMessage />
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
                    name="More"
                    component={MoreNavigator}
                    options={optionsHandler}
                  />
                </Tab.Navigator>
              </SuccessContextProvider>
            </GroupsContextProvider>
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
    case "More":
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
            <AntDesign name="appstore-o" size={28} color="#0064e5" />
          ) : (
            <AntDesign name="appstore-o" size={28} color="#727272" />
          ),
        headerShown: false,
      };
  }
};
