import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState, useRef } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "../screens/home";
import ClientsNavigator from "../screens/clients";
import TasksNavigator from "../screens/tasks";
import MoreNavigator from "../screens/more";
import { Provider } from "react-redux";
import store from "../redux/index";
import SuccessMessage from "../components/UI/SuccessMessage";
import { ClientContextProvider } from "../context/client-context";
import { TaskContextProvider } from "../context/task-context";
import { SuccessContextProvider } from "../context/success-context";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function AppNavigator() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    //when app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        setNotification(notification)
      );

    //whenever a user taps on or interacts with a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response)
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={store}>
      <ClientContextProvider>
        <TaskContextProvider>
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
        </TaskContextProvider>
      </ClientContextProvider>
    </Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync(); 
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }
  console.log(token)

  return token;
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
