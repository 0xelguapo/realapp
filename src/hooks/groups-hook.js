import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, fetchGroups, selectAllGroups } from "../redux/groups-slice";
import { fetchPropertyGroups, selectAllPropertyGroups } from "../redux/propertyGroups-slice";

function useGroups() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchPropertyGroups())
  }, []);

  const clientGroups = useSelector(selectAllGroups)
  const propertyGroups = useSelector(selectAllPropertyGroups)

  const handleAddClientGroup = async (title) => {
    dispatch(addGroup(title))
  }

  return { clientGroups, propertyGroups, handleAddClientGroup}
}

export default useGroups;