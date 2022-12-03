import { View, StyleSheet, Text } from "react-native";
import SwipeToDeleteWrapper from "../gesture/SwipeToDeleteWrapper";

export default function ConnectionHistory({ date, client, title, content }) {
  
  return (
    <SwipeToDeleteWrapper viewStyle={{ backgroundColor: "#f5f5f5" }}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {client.firstName + " " + client?.lastName}
          </Text>
          <Text style={styles.title}>{title}</Text>
          {content?.length > 0 && <Text style={styles.content}>{content}</Text>}
        </View>
      </View>
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
});
