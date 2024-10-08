import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Text,
  I18nManager,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch } from "react-redux";
import useNotifications from "../../hooks/notification-hook";
import { editGoal, removeGoal } from "../../redux/goals-slice";

export default function SwipeableGoal({
  children,
  timesPerDay,
  incrementAmount,
  timesCompleted,
  goalId,
  notificationId,
  length,
  index,
}) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

  const updateRef = useRef(null);
  const dispatch = useDispatch();

  const { handleDeleteNotification } = useNotifications();

  const timesCompletedInt = parseInt(timesCompleted);

  const handleIncrementGoal = () => {
    let incrementAmountInt = parseInt(incrementAmount);
    let newAmount = timesCompletedInt + incrementAmountInt;
    dispatch(editGoal({ id: goalId, timesCompleted: newAmount.toString() }));
    close();
  };

  const handleCompleteGoal = () => {
    dispatch(editGoal({ id: goalId, timesCompleted: timesPerDay }));
    close();
  };

  const renderLeftAction = (
    text,
    color,
    x,
    progress,
    onPress,
    first = false
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      close();
      alert(text);
    };

    return (
      <Animated.View
        style={[
          first && styles.rounded,
          { flex: 1, overflow: "hidden", transform: [{ translateX: 0 }] },
        ]}
      >
        <RectButton
          style={[styles.leftAction, { backgroundColor: color }]}
          onPress={onPress}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderLeftActions = (progress) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {renderLeftAction(
        "Done",
        "#0e9f6e",
        128,
        progress,
        handleCompleteGoal,
        true
      )}
      {renderLeftAction(
        "+" + incrementAmount,
        "#31c48d",
        64,
        progress,
        handleIncrementGoal
      )}
    </View>
  );

  const handleDeleteGoal = async () => {
    if (notificationId) {
      const notificationIdsArray = notificationId.split(",");
      for (const notifId of notificationIdsArray) {
        console.log(await handleDeleteNotification(notifId));
      }
    }
    dispatch(removeGoal(goalId));
    close();
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton style={styles.rightAction} onPress={handleDeleteGoal}>
        <Animated.Text style={[styles.actionText]}>Delete</Animated.Text>
      </RectButton>
    );
  };

  const close = () => {
    updateRef.current.close();
  };

  const swipeOpen = () => {
    updateRef.current.onSwipeableOpen("right");
  };

  return (
    <Swipeable
      overshootRight={false}
      onSwipeableRightOpen={handleDeleteGoal}
      ref={updateRef}
      friction={2}
      leftThreshold={50}
      rightThreshold={135}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  rightAction: {
    flex: 1,
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    borderRadius: 5,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
    textAlign: "right",
  },

  rectButton: {
    flex: 1,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "white",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  messageText: {
    color: "#999",
    backgroundColor: "transparent",
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 20,
    top: 10,
    color: "#999",
    fontWeight: "bold",
  },
  rounded: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
