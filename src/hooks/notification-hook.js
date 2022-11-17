import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function useNotifications() {
  const calcTrigger = async () => {
    let nextTriggerDate;
    try {
      nextTriggerDate = await Notifications.getNextTriggerDateAsync({
        hour: 23,
        minute: 59,
      });
      console.log(
        nextTriggerDate === null
          ? "No next trigger date"
          : new Date(nextTriggerDate)
      );
    } catch (e) {
      console.error(`Couldn't calcluate next trigger date: ${e}`);
    }
    return nextTriggerDate;
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    } else if (existingStatus === "granted") return true;
    if (finalStatus !== "granted") {
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: null,
        experienceId: null,
      })
    ).data;
    return token;
  };

  const handleScheduleNotification = async (title, hour, minute, weekday) => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    if (existingStatus !== "granted") {
      if (existingStatus === "undetermined")
        await registerForPushNotificationsAsync();
      else {
        Alert.alert("Please Allow CoAgent to Access Contacts", "", [
          { text: "Cancel" },
          {
            text: "Settings",
            onPress: () => Linking.openSettings(),
          },
        ]);
      }
      return;
    } else {
      response = await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
        },
        trigger: {
          repeats: true,
          hour: hour,
          minute: minute,
          weekday: weekday
        }
      });
    }
    return response;
  };
  
  const getScheduledNotifications = async () => {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    return response
  };

  const cancelAllScheduledNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }
 
  return { calcTrigger, handleScheduleNotification, getScheduledNotifications, cancelAllScheduledNotifications };
}

export default useNotifications;
