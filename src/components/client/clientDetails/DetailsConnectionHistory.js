import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

export default function DetailsConnectionHistory({
  clientDetailsState,
  viewConnectionHandler,
}) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.blockHeadingContainer}>
        <Text style={styles.blockHeadingText}>CONNECTION HISTORY</Text>
        <Pressable onPress={viewConnectionHandler}>
          <Ionicons name="add-circle-outline" size={20} color="#ababab" />
        </Pressable>
      </View>
      <View style={styles.detailContainer}>
        {clientDetailsState.connectionHistory.items?.length ? (
          clientDetailsState.connectionHistory.items.map((el) => (
            <View style={styles.connection} key={el.id}>
              <Text style={styles.connectionTitle}>{el.title}</Text>
              {el.content?.length > 0 && (
                <Text style={styles.connectionContent}>{el.content}</Text>
              )}
              {el.date.length > 0 && (
                <Text style={styles.connectionDate}>
                  {format(new Date(el.date), 'MMM dd, yyyy • p')}
                </Text>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyPlaceholderContainer}>
            <Text style={styles.emptyPlaceholder}>Log your calls...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blockHeadingText: {
    color: "#ababab",
    letterSpacing: 2,
    fontSize: 12,
    paddingVertical: 5,
  },
  blockHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    borderBottomColor: "#ababab",
  },
  detailsContainer: {
    paddingVertical: 5,
    borderColor: "#000000",
    minHeight: 75,
  },
  detailContainer: {
    display: "flex",
    paddingVertical: 3,
  },
  connection: {
    paddingVertical: 5,
  },
  connectionTitle: {
    fontWeight: "500",
    fontSize: 15,
    color: "#6c6c6c",
  },
  connectionContent: {
    fontSize: 14,
    color: '#6c6c6c'
  },
  connectionDate: {
    color: "#ababab",
    fontSize: 14,
  },
  emptyPlaceholderContainer: {
    justifyContent: "center",
  },
  emptyPlaceholder: {
    color: "#ababab",
  },
});
