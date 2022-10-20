import { useState, useMemo, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  addClientToGroup,
  removeClientFromGroup,
} from "../../redux/groups-slice";
import {
  handleAddClientToGroup,
  handleRemoveClientFromGroup,
} from "../../redux/clients-slice";

export default function ClientGroup({ el, clientId, clientGroupID }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(el.inGroup);
  const [groupLength, setGroupLength] = useState(el.clients.items.length);
  const [clientGroupIDState, setClientGroupIDState] = useState(clientGroupID);

  const addToGroup = async () => {
    const response = await dispatch(
      addClientToGroup({ clientId: clientId, clientGroupID: el.id })
    ).unwrap();
    if (response) {
      dispatch(
        handleAddClientToGroup({
          clientId: response.client.id,
          clientGroupID: response.clientGroupID,
          id: response.id,
        })
      );
      setClientGroupIDState(response.id);
      setGroupLength((prevState) => prevState + 1);
    }
  };

  const removeFromGroup = async () => {
    const response = await dispatch(
      removeClientFromGroup(clientGroupIDState)
    ).unwrap();
    if (response) {
      //response.id refers to the joinTable groupsClientsID
      dispatch(
        handleRemoveClientFromGroup({
          clientId: response.client.id,
          clientGroupID: response.clientGroupID,
          id: response.id,
        })
      );
      setGroupLength((prevState) => prevState - 1);
    }
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
    <TouchableOpacity style={styles.clientGroup} onPress={handlePress}>
      <View>
        <Text style={styles.clientGroupTitle}>{el.title}</Text>
        <View style={styles.clientGroupDetails}>
          {!el.clients?.length ? (
            <Text style={styles.clientsLength}>{groupLength}</Text>
          ) : (
            <Text style={styles.clientsLength}>0</Text>
          )}

          <Ionicons name="ios-people-outline" size={12} color="#535353" />
        </View>
      </View>
      <View>
        {checked && <Ionicons name="checkmark" size={20} color="#535353" />}
      </View>
    </TouchableOpacity>
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
    marginBottom: 3,
  },
  clientsLength: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
    marginRight: 3,
  },
});
