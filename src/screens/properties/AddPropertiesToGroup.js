import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PropertiesList from "../../components/property/PropertiesList";
import {
  fetchPropertiesWithGroups,
  handleAddPropertyToGroup,
  selectAllProperties,
} from "../../redux/properties-slice";
import { addPropertyToGroup } from "../../redux/propertyGroups-slice";

export default function AddPropertiesToGroup(props) {
  const { groupID } = props.route.params;
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const allProperties = useSelector(selectAllProperties);
  const status = useSelector((state) => state.properties.status);

  useEffect(() => {
    dispatch(fetchPropertiesWithGroups());
  }, []);

  const filteredData = useMemo(() => {
    return allProperties.filter((prop) => {
      let inCurrentGroup;
      if (prop.group?.items?.length > 0) {
        inCurrentGroup = prop.group.items.indexOf((el) => {
          el.id === groupID;
        });
      }
      const streetData =
        prop.street + " " + prop?.city + " " + prop?.state + " " + prop?.zip;
      const lowerCaseData = streetData.toLowerCase();
      const textData = searchInput.toLowerCase();
      return lowerCaseData.indexOf(textData) > -1 && !inCurrentGroup;
    });
  }, [searchInput, allProperties]);

  const handleSelectProperty = async (item) => {
    const { id } = item;
    const response = await dispatch(
      addPropertyToGroup({ propertyID: id, propertyGroupID: groupID })
    ).unwrap();
    console.log(response);
    if (response) {
      dispatch(
        handleAddPropertyToGroup({
          propertyId: response.property.id,
          propertyGroupID: response.propertyGroupID,
          id: response.id,
        })
      );
    }
  };

  return (
    <PropertiesList
      handleGoBack={props.navigation.goBack}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      status={status}
      filteredData={filteredData}
      handleSelectProperty={handleSelectProperty}
    />
  );
}
