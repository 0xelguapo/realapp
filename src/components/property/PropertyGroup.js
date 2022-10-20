import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addPropertyToGroup,
  removePropertyFromGroup,
} from "../../redux/propertyGroups-slice";
import {
  handleAddPropertyToGroup,
  handleRemovePropertyFromGroup,
} from "../../redux/properties-slice";

export default function PropertyGroup({
  propertyGroup,
  propertyId,
  groupsPropertyID,
  inGroup,
}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(inGroup);
  const [groupsPropertyIDState, setGroupsPropertyIDState] =
    useState(groupsPropertyID);

  const addToGroup = async () => {
    const response = await dispatch(
      addPropertyToGroup({
        propertyID: propertyId,
        propertyGroupID: propertyGroup.id,
      })
    ).unwrap();
    if (response) {
      dispatch(
        handleAddPropertyToGroup({
          propertyId: response.property.id,
          propertyGroupID: response.propertyGroupID,
          id: response.id,
        })
      );
      setGroupsPropertyIDState(response.id);
    }
  };

  const removeFromGroup = async () => {
    // console.log(groupsPropertyID)
    const response = await dispatch(
      removePropertyFromGroup(groupsPropertyID)
    ).unwrap();
    if (response) {
      dispatch(
        handleRemovePropertyFromGroup({
          propertyId: response.property.id,
          propertyGroupID: response.propertyGroupID,
        })
      );
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
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{propertyGroup.title}</Text>
          {propertyGroup.properties.items?.length ? (
            <View style={styles.lengthContainer}>
              <Text style={styles.lengthText}>
                {propertyGroup.properties.items.length}
              </Text>
              <FontAwesome name="building-o" size={10} color="#727272" />
            </View>
          ) : (
            <View style={styles.lengthContainer}>
              <Text style={styles.lengthText}>0</Text>
              <FontAwesome name="building-o" size={10} color="#727272" />
            </View>
          )}
        </View>
        <View>
          {checked && <Ionicons name="checkmark" size={20} color="#535353" />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontWeight: "600",
    marginBottom: 3,
  },
  lengthContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lengthText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#535353",
    marginRight: 3,
  },
});
