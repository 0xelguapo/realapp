import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useClient from "../hooks/client-hook";

export default function ClientGroup({ el, clientId, clientGroupID }) {
  const [checked, setChecked] = useState(el.inGroup);
  const [groupLength, setGroupLength] = useState(el.clients.items.length);
  const [groupID, setGroupID] = useState(clientGroupID);
  const { addClientToGroup, removeClientFromGroup } = useClient();


  const addToGroup = async () => {
    const response = await addClientToGroup(clientId, el.id);
    if (response) {
      setGroupID(response.data.createGroupsClients.id);
      setGroupLength((prevState) => prevState + 1);
    }
  };

  const removeFromGroup = async () => {
    const response = await removeClientFromGroup(groupID);
    if (response) setGroupLength((prevState) => prevState - 1);
  };

  const handlePress = () => {
    if (checked) {
      removeFromGroup();
      setChecked(false);
    } else {
      addToGroup();
      setChecked(true);
    }
  };

  return (
    <Pressable style={styles.clientGroup} onPress={handlePress}>
      <View>
        <Text style={styles.clientGroupTitle}>{el.title}</Text>
        <View style={styles.clientGroupDetails}>
          <Text>
            {!el.clients?.length ? (
              <Text style={styles.clientsLength}>
                {groupLength}
              </Text>
            ) : (
              <Text style={styles.clientsLength}>0</Text>
            )}
          </Text>
          <Ionicons name="ios-people-outline" size={12} color="#535353" />
        </View>
      </View>
      <View>
        {checked && <Ionicons name="checkmark" size={20} color="#535353" />}
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
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 5,
    flexDirection: "row",
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
