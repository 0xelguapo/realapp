import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { format, differenceInMinutes } from "date-fns";
import { useNavigation } from "@react-navigation/native";

export default function HomeTask({
  title,
  content,
  date,
  completed,
  index,
  length,
  clientId,
  onPress,
}) {
  const navigation = useNavigation();
  const [overdue, setOverdue] = useState(false);

  const handleViewClient = () => {
    if (clientId) {
      navigation.navigate("ClientDetails", { client: { id: clientId } });
    }
  };
  useEffect(() => {
    if (differenceInMinutes(new Date(date), new Date()) < 0) {
      setOverdue(true);
    }
  }, []);

  return (
    <View
      style={
        index === 0
          ? {
              ...styles.taskContainer,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }
          : index === length - 1
          ? {
              ...styles.taskContainer,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomWidth: 0,
            }
          : styles.taskContainer
      }
    >
      <View style={styles.goContainer}>
        {completed ? (
          <TouchableOpacity onPress={onPress}>
            <AntDesign name="checkcircle" size={18} color="#7b7b7c" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onPress}
            style={styles.circle}
          ></TouchableOpacity>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text
          style={
            !completed
              ? !overdue
                ? styles.taskTitle
                : { ...styles.taskTitle, color: "#F05252" }
              : { ...styles.taskTitle, textDecorationLine: "line-through" }
          }
        >
          {title}
        </Text>
        {content.length > 0 && (
          <Text
            style={
              !completed
                ? !overdue
                  ? styles.taskContent
                  : { ...styles.taskContent, color: "#F05252" }
                : { ...styles.taskContent, textDecorationLine: "line-through" }
            }
          >
            {content}
          </Text>
        )}
        {date.length > 0 && (
          <Text
            style={
              !completed
                ? !overdue
                  ? styles.taskTime
                  : { ...styles.taskTime, color: "#F05252" }
                : { ...styles.taskTime, textDecorationLine: "line-through" }
            }
          >
            {format(new Date(date), "MMM dd • p")}
          </Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        {clientId ? (
          <Pressable
            style={styles.clientIconContainer}
            onPress={handleViewClient}
          >
            <Ionicons name="person-outline" size={15} color="#6c6c6c" />
            <Entypo name="chevron-right" size={15} color="#6c6c6c" />
          </Pressable>
        ) : (
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            size={15}
            color="#6c6c6c"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 25,
    minHeight: 60,
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },
  textContainer: {
    display: "flex",
    flex: 1,
  },
  taskTitle: {
    fontWeight: "500",
    fontSize: 17,
    color: "#454545",
  },
  taskContent: {
    fontSize: 14,
    color: "#6c6c6c",
  },
  taskTime: {
    color: "#6c6c6c",
    marginTop: 3,
  },
  circle: {
    width: 18,
    height: 18,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: "#7b7b7c",
  },
  goContainer: {
    display: "flex",
    justifyContent: "center",
    marginRight: 10,
  },
  checkedTitle: {
    textDecorationLine: "line-through",
  },
  clientIconContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
