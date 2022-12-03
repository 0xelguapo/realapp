import { StyleSheet, Animated } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { useRef } from "react";
import Reanimated, { FadeOut, Layout } from "react-native-reanimated";

export default function SwipeToDeleteWrapper({
  handleDelete,
  children,
  viewStyle,
}) {
  const updateRef = useRef(null);
  const close = () => {
    updateRef.current.close();
  };

  const deleteHandler = () => {
    close();
    handleDelete();
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton style={styles.rightAction} onPress={deleteHandler}>
        <Animated.Text style={[styles.actionText]}>Delete</Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      rightThreshold={130}
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={deleteHandler}
    >
      <Reanimated.View
        exiting={FadeOut}
        layout={Layout.springify()}
        style={viewStyle}
      >
        {children}
      </Reanimated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  rightAction: {
    flex: 1,
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    // borderRadius: 5,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
    textAlign: "right",
  },
});
