import React, { Component, useRef } from "react";
import { Animated, StyleSheet, View, Text, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch } from "react-redux";
import { GoalRow } from "./GoalRow";

export default function SwipeableGoal({ children, timesPerDay }) {
  const updateRef = useRef(null);
  const dispatch = useDispatch();
  const timesPerDayInt = parseInt(timesPerDay);
  const incrementAmount =
    timesPerDayInt > 5 ? Math.round(timesPerDayInt * 0.1) : timesPerDayInt;

  const incrementGoal = () => {
    
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
        <RectButton style={[styles.leftAction, { backgroundColor: color }]}>
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
      {renderLeftAction("Done", "#0e9f6e", 128, progress, null, true)}
      {renderLeftAction(
        `+${timesPerDay > 5 ? Math.round(timesPerDay * 0.1) : +1}`,
        "#31c48d",
        64,
        progress,
        null
      )}
    </View>
  );

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton style={styles.rightAction} onPress={close}>
        <Animated.Text style={[styles.actionText]}>Delete</Animated.Text>
      </RectButton>
    );
  };

  const close = () => {
    updateRef.current.close();
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={50}
      rightThreshold={130}
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
