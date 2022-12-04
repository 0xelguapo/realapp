import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, fetchGroups, selectAllGroups } from "../redux/groups-slice";
import {
  addPropertyGroup,
  fetchPropertyGroups,
  removeMultiplePropertiesFromGroup,
  removePropertyGroup,
  selectAllPropertyGroups,
} from "../redux/propertyGroups-slice";

function useGroups(fetch = true) {
  const dispatch = useDispatch();
  const [toBeRemovedArray, setToBeRemovedArray] = useState([]);

  useEffect(() => {
    if (fetch) {
      dispatch(fetchGroups());
      dispatch(fetchPropertyGroups());
    }
  }, []);

  const clientGroups = useSelector(selectAllGroups);
  const propertyGroups = useSelector(selectAllPropertyGroups);

  const handleAddClientGroup = async (title) => {
    dispatch(addGroup(title));
  };

  const handleAddPropertyGroup = async (title) => {
    dispatch(addPropertyGroup(title));
  };

  const handleRemoveArray = (relatedGroupID, undo = false) => {
    let idsArray = [...toBeRemovedArray];
    if (!undo) {
      idsArray.push(relatedGroupID);
      setToBeRemovedArray(idsArray);
    } else {
      const index = idsArray.indexOf(relatedGroupID);
      idsArray.splice(index, 1);
      setToBeRemovedArray(idsArray);
    }
    return idsArray;
  };

  const handleDeletePropertyGroup = (id, propertyGroup) => {
    if (propertyGroup.properties.items.length === 0) {
      dispatch(removePropertyGroup(id));
    } else {
      const allPropertiesToBeRemoved = propertyGroup.properties.items.map(
        (el) => el.id
      );
      dispatch(
        removeMultiplePropertiesFromGroup({
          removeIDs: allPropertiesToBeRemoved,
          groupID: id,
        })
      ).then(() => dispatch(removePropertyGroup(id)));
    }
  };

  return {
    clientGroups,
    propertyGroups,
    toBeRemovedArray,
    handleAddClientGroup,
    handleAddPropertyGroup,
    handleRemoveArray,
    handleDeletePropertyGroup,
  };
}

export default useGroups;
