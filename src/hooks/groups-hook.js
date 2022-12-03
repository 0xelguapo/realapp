import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, fetchGroups, selectAllGroups } from "../redux/groups-slice";
import {
  addPropertyGroup,
  fetchPropertyGroups,
  selectAllPropertyGroups,
} from "../redux/propertyGroups-slice";

function useGroups() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchPropertyGroups());
  }, []);

  const clientGroups = useSelector(selectAllGroups);
  const propertyGroups = useSelector(selectAllPropertyGroups);

  const handleAddClientGroup = async (title) => {
    dispatch(addGroup(title));
  };

  const handleAddPropertyGroup = async (title) => {
    dispatch(addPropertyGroup(title));
  };

  return {
    clientGroups,
    propertyGroups,
    handleAddClientGroup,
    handleAddPropertyGroup,
  };
}

export default useGroups;
