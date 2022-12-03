import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleClientAfterDeleteConnection } from "../redux/clients-slice";
import {
  fetchConnections,
  removeConnection,
  selectAllConnections,
} from "../redux/connections-slice";

function useConnections() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConnections());
  }, []);

  const allConnections = useSelector(selectAllConnections);

  const handleDeleteConnection = (clientId, connectionId) => {
    dispatch(removeConnection(connectionId));
    // dispatch(handleClientAfterDeleteConnection({ clientId, connectionId }));
  };

  return { allConnections, handleDeleteConnection };
}

export default useConnections;
