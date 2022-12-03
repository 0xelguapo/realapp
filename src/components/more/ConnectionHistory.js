import { format } from "date-fns";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SwipeToDeleteWrapper from "../gesture/SwipeToDeleteWrapper";
import { Ionicons, Entypo } from "@expo/vector-icons";


export default function ConnectionHistory({ date, client, title, content, onPress, handleDelete }) {
  return (
    <SwipeToDeleteWrapper viewStyle={{ backgroundColor: "#f5f5f5" }} handleDelete={handleDelete}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {client.firstName + " " + client?.lastName}
          </Text>
          <Text style={styles.title}>{title}</Text>
          {content?.length > 0 && <Text style={styles.content}>{content}</Text>}
          <Text style={styles.date}>
            {format(new Date(date), "LLL dd y • p")}
          </Text>
        </View>

        <View style={styles.clientIconContainer}>
          <Ionicons name="person-outline" size={15} color="#6c6c6c" />
          <Entypo name="chevron-right" size={15} color="#6c6c6c" />
        </View>
      </TouchableOpacity>
    </SwipeToDeleteWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    flex: 1
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    color: "#454545",
  },
  title: {
    fontWeight: "500",
    fontSize: 14,
    color: "#6c6c6c",
  },
  content: {
    color: "#6c6c6c",
    fontWeight: "300",
  },
  date: {
    marginTop: 5,
    color: "#6c6c6c",
    fontWeight: "300",
  },
  clientIconContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
