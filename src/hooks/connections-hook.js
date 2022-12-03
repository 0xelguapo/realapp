import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchConnections, selectAllConnections } from "../redux/connections-slice";

function useConnections() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConnections())
  }, [])

  const allConnections = useSelector(selectAllConnections)

  return { allConnections }


}

export default useConnections