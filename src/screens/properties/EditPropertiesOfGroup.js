import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditItemsOfGroup from "../../components/UI/EditItemsOfGroup";
import useGroups from "../../hooks/groups-hook";
import {
  editPropertyGroupTitle,
  removeMultiplePropertiesFromGroup,
  selectPropertyGroupById,
} from "../../redux/propertyGroups-slice";
import EditingProperty from "../../components/property/EditingProperty";

export default function EditPropertiesOfGroup(props) {
  const { groupID, groupTitle } = props.route.params;
  const propertyGroup = useSelector((state) =>
    selectPropertyGroupById(state, groupID)
  );

  const [groupTitleInput, setGroupTitleInput] = useState(groupTitle);
  const { toBeRemovedArray, handleRemoveArray } = useGroups(false);
  const dispatch = useDispatch();

  const handleBlurTitleInput = () => {
    dispatch(editPropertyGroupTitle({ id: groupID, title: groupTitleInput }));
  };

  const handleSubmit = () => {
    dispatch(
      removeMultiplePropertiesFromGroup({
        removeIDs: toBeRemovedArray,
        groupID: groupID,
      })
    );
    props.navigation.goBack();
  };

  return (
    <EditItemsOfGroup
      groupTitleInput={groupTitleInput}
      setGroupTitleInput={setGroupTitleInput}
      lengthText={`${propertyGroup.properties.items.length} Properties`}
      addButtonText="Add Properties"
      handleGoBack={props.navigation.goBack}
      handleSubmit={handleSubmit}
      handleBlurTitleInput={handleBlurTitleInput}
      handleNavigateAdd={() =>
        props.navigation.navigate("AddPropertiesToGroup", { groupID: groupID })
      }
    >
      {propertyGroup.properties.items.map(({ property, id }, index) => (
        <EditingProperty
          key={property.id}
          street={property.street}
          city={property.city}
          state={property.state}
          zip={property.zip}
          groupsPropertyID={id}
          handleAddToRemove={handleRemoveArray}
        />
      ))}
    </EditItemsOfGroup>
  );
}
