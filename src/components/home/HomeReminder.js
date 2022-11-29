import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  Swipeable,
  TouchableOpacity,
  RectButton,
} from "react-native-gesture-handler";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { completeReminder } from "../../redux/reminders-slice";

export default function HomeReminder({ reminder, onPress, activeDate }) {
  const updateRef = useRef();
  const dispatch = useDispatch();

  const close = () => {
    updateRef.current.close();
  };

  const handleCompleteReminder = () => {
    dispatch(completeReminder({ id: reminder.id }));
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
        width: 64,
      }}
    >
      {renderLeftAction(
        "Done",
        "#0e9f6e",
        64,
        progress,
        handleCompleteReminder,
        true
      )}
    </View>
  );

  return (
    <Swipeable
      leftThreshold={50}
      friction={2}
      ref={updateRef}
      renderLeftActions={renderLeftActions}
    >
      <Pressable style={styles.container} onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {reminder.client.firstName + " " + reminder.client?.lastName}
          </Text>
          <Text style={styles.content}>{reminder.freq}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Feather name="bell" size={15} color="#535353" />
        </View>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    alignItems: "center",
    flex: 1,
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

  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 25,
    minHeight: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "white",
  },
  textContainer: {
    display: "flex",
    flex: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 17,
    color: "#454545",
  },
  content: {
    fontSize: 14,
    color: "#6c6c6c",
  },
  time: {
    color: "#6c6c6c",
    marginTop: 3,
  },
});
