import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useClient from "../hooks/client-hook";

export default function ClientGroup({ el, clientId }) {
  const { addClientToGroup } = useClient();

  const addToGroup = async () => {
    const response = await addClientToGroup(clientId, el.id);
    // if (response) console.log(response);
  };

  return (
    <Pressable style={styles.clientGroup} onPress={addToGroup}>
      <Text style={styles.clientGroupTitle}>{el.title}</Text>
      <View style={styles.clientGroupDetails}>
        <Text>
          {!el.clients?.length ? (
            <Text style={styles.clientsLength}>{el.clients.items.length}</Text>
          ) : (
            <Text style={styles.clientsLength}>0</Text>
          )}
        </Text>
        <Ionicons name="ios-people-outline" size={12} color="#535353" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  clientGroup: {
    paddingHorizontal: 15,
    borderWidth: 0.8,
    height: 60,
    display: "flex",
    justifyContent: "space-evenly",
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 5,
  },
  clientGroupDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 22,
  },
  clientGroupTitle: {
    fontWeight: "600",
  },
  clientsLength: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
  },
});
