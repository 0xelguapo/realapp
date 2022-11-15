import React, { Component, useRef } from "react";
import { Animated, StyleSheet, View, Text, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

const Row = ({ item }) => (
  <RectButton style={styles.rectButton} onPress={() => alert(item.from)}>
    <Text style={styles.fromText}>{item.from}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {item.message}
    </Text>
    <Text style={styles.dateText}>
      {item.when} {"❭"}
    </Text>
  </RectButton>
);

export default function SwipeableRow() {
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
        <RectButton style={[styles.rightAction, { backgroundColor: color }]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={close}>
        <Animated.Text style={[styles.actionText]}>Delete</Animated.Text>
      </RectButton>
    );
  };

  const close = () => {
    updateRef.current.close();
  };

  const renderLeftActions = (progress) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {renderLeftAction("More", "#c8c7cd", 192, progress)}
      {renderLeftAction("Flag", "#ffab00", 128, progress)}
      {renderLeftAction("More", "#dd2c00", 64, progress)}
    </View>
  );

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={50}
      rightThreshold={120}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <Row item={{ from: "doctor", when: "3:11PM", message: "fuck you" }} />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
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
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
