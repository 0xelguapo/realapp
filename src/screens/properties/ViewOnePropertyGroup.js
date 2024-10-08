import { Alert } from "react-native";
import { useSelector } from "react-redux";
import EachProperty from "../../components/property/EachProperty";
import OneGroupView from "../../components/UI/OneGroupView";
import useGroups from "../../hooks/groups-hook";
import { selectPropertyGroupById } from "../../redux/propertyGroups-slice";

export default function ViewOnePropertyGroup({ route, navigation }) {
  const { groupID } = route.params;
  const propertyGroup = useSelector((state) =>
    selectPropertyGroupById(state, groupID)
  );
  const { handleDeletePropertyGroup } = useGroups(false);

  const handleDeleteGroup = () => {
    Alert.alert(
      "Are you sure you want to delete this group? This action cannot be undone",
      null,
      [
        { text: "Cancel", style: "default" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            handleDeletePropertyGroup(groupID, propertyGroup);
            navigation.goBack()
          },
        },
      ]
    );
  };

  const handleEditGroup = () => {
    navigation.navigate("EditPropertiesOfGroup", {
      groupID: groupID,
      groupTitle: propertyGroup.title,
    });
  };

  const handleViewProperty = (propertyId) => {
    navigation.goBack();
    navigation.navigate("PropertyDetails", {
      id: propertyId,
    });
  };

  return (
    <OneGroupView
      title={propertyGroup.title}
      length={propertyGroup.properties.items.length}
      handleDelete={handleDeleteGroup}
      handleEdit={handleEditGroup}
    >
      {propertyGroup.properties.items.map((prop, index) => (
        <EachProperty
          key={prop.property.id + index}
          street={prop.property.street}
          city={prop.property.city}
          state={prop.property.state}
          zipCode={prop.property.zipCode}
          handlePress={() => handleViewProperty(prop.property.id)}
          noHorizontalPadding={true}
        />
      ))}
    </OneGroupView>
  );
}
