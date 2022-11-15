import React, { Component, useRef } from "react";
import { Animated, StyleSheet, View, Text, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Row } from "./GoalRow";

export default function Goal({children}) {
  const updateRef = useRef(null);

  const renderLeftAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      close();
      alert(text);
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
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
      {renderLeftAction("Done", "#0e9f6e", 128, progress)}
      {renderLeftAction("+1", "#31c48d", 64, progress)}
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
      rightThreshold={120}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      {<Row item={{ from: "doctor", message: "3:11PM", times: "1/4" }} />}
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
});
