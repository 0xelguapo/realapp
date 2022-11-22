import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState, useRef } from "react";
import { RC_API_KEY } from "../constants";
import { Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "../redux/index";
import { SuccessContextProvider } from "../context/success-context";
import SuccessMessage from "../components/UI/SuccessMessage";
import HomeNavigator from "../screens/home";
import ClientsNavigator from "../screens/clients";
import MoreNavigator from "../screens/more";
import PropertiesNavigator from "../screens/properties";
import { AntDesign, Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
// import TasksNavigator from "../screens/tasks";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
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
      <SuccessContextProvider>
        <SuccessMessage />
        <Tab.Navigator screenOptions={{ tabBarStyle: styles }}>
          <Tab.Screen
            name="Focus"
            component={HomeNavigator}
            options={optionsHandler}
          />
          <Tab.Screen
            name="Data"
            component={ClientsNavigator}
            options={optionsHandler}
          />
          {/* <Tab.Screen
            name="Properties"
            component={PropertiesNavigator}
            options={optionsHandler}
          /> */}
          <Tab.Screen
            name="More"
            component={MoreNavigator}
            options={optionsHandler}
          />
        </Tab.Navigator>
      </SuccessContextProvider>
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
    case "Focus":
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
            <Feather name="clipboard" size={22} color="#0064e5" />
          ) : (
            <Feather name="clipboard" size={22} color="#727272" />
          ),
        headerShown: false,
      };
    case "Data":
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
            <Ionicons name="ios-search" size={25} color="#0064e5" />
          ) : (
            <Ionicons name="ios-search" size={25} color="#727272" />
          ),
        headerShown: false,
      };
    case "Properties":
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
            <FontAwesome name="building-o" size={21} color="#0064e5" />
          ) : (
            <FontAwesome name="building-o" size={21} color="#727272" />
          ),
        headerShown: false,
      };
    // case "Tasks":
    //   return {
    //     tabBarLabel: ({ focused }) =>
    //       focused ? (
    //         <Text style={{ fontSize: 11, color: "#0064e5", fontWeight: "600" }}>
    //           {route.name}
    //         </Text>
    //       ) : (
    //         <Text style={{ fontSize: 11, color: "#727272" }}>{route.name}</Text>
    //       ),
    //     tabBarIcon: ({ focused }) =>
    //       focused ? (
    //         <MaterialCommunityIcons
    //           name="clipboard-list-outline"
    //           size={28}
    //           color="#0064e5"
    //         />
    //       ) : (
    //         <MaterialCommunityIcons
    //           name="clipboard-list-outline"
    //           size={28}
    //           color="#727272"
    //         />
    //       ),
    //     headerShown: false,
    //   };
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
            <AntDesign name="appstore-o" size={22} color="#0064e5" />
          ) : (
            <AntDesign name="appstore-o" size={22} color="#727272" />
          ),
        headerShown: false,
      };
  }
};
