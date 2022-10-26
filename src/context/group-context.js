import { createContext, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { getClientGroupWithClientDetails, listClientGroupsWithClients } from "../graphql/customQueries";

const GroupsContext = createContext();

function GroupsContextProvider({ children }) {
  const [clientsOfGroup, setClientsOfGroup] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  const getClientsFromOneGroup = async (groupId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(getClientGroupWithClientDetails, {
          id: groupId,
        })
      );
    } catch (err) {
      console.error(err);
    }
    const { items: clientsArray } = response.data.getClientGroup.clients;
    setClientsOfGroup(clientsArray);
    return response;
  };

  const getAllGroups = async () => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(listClientGroupsWithClients)
      );
    } catch (err) {
      console.error(err);
    }
    setAllGroups(response.data.listClientGroups.items);
    return response;
  };

  const removeClientFromClientsOfGroupArray = (clientId) => {
    let copyOfClientsOfGroup = [...clientsOfGroup];
    const indexOfClient = copyOfClientsOfGroup.findIndex(
      (client) => client.client.id === clientId
    );
    copyOfClientsOfGroup.splice(indexOfClient, 1);
    setClientsOfGroup(copyOfClientsOfGroup);
  };

  return (
    <GroupsContext.Provider
      value={{
        clientsOfGroup,
        allGroups,
        getClientsFromOneGroup,
        getAllGroups,
        removeClientFromClientsOfGroupArray,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
}

export { GroupsContext, GroupsContextProvider };
