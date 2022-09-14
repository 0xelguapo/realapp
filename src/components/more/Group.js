import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useClient from "../../hooks/client-hook";
import { useNavigation } from "@react-navigation/native";

export default function ClientGroup({ el }) {
  const navigation = useNavigation();

  const handleViewGroup = () => {
    navigation.navigate("ViewOneGroup", {
      groupID: el.id,
      groupTitle: el.title,
    });
  };

  return (
    <Pressable style={styles.clientGroup} onPress={handleViewGroup}>
      <View>
        <Text style={styles.clientGroupTitle}>{el.title}</Text>
        <View style={styles.clientGroupDetails}>
          <Text>
            {!el.clients?.length ? (
              <Text style={styles.clientsLength}>
                {el.clients.items.length}
              </Text>
            ) : (
              <Text style={styles.clientsLength}>0</Text>
            )}
          </Text>
          <Ionicons name="ios-people-outline" size={12} color="#535353" />
        </View>
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
    justifyContent: "center",
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
    marginBottom: 3,
  },
  clientsLength: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
  },
});
