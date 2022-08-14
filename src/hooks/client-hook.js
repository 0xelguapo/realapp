import { useContext } from "react";
import { ClientsContext } from "../context/client-context";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

function useClient() {
  const {
    getFavoriteClients,
    mutateClientsArrayByIndex,
    removeClientFromArrayByIndex,
  } = useContext(ClientsContext);

  const updateFavorite = async (id, favorite, index) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.updateClient, {
          input: { id: id, favorite: favorite },
        })
      );
      if (response) {
        mutateClientsArrayByIndex(response.data.updateClient, index)
      }
    } catch (err) {
      console.error("error adding favorite", err);
    }
    return response;
  };

  const updateClient = async (details, index) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.updateClient, { input: details })
      );
    } catch (err) {
      console.error("error adding favorite", err);
    }
    if (response.data) {
      mutateClientsArrayByIndex(response.data.updateClient, index);
    }
    return response;
  };

  const addConnection = async (inputDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.createConnectionHistory, {
          input: inputDetails,
        })
      );
    } catch (err) {
      console.error("error adding connection", err);
    }
    console.log(response);
    return response;
  };

  const addEditNote = async (id, notes) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.updateClient, {
          input: {
            id: id,
            notes: notes,
          },
        })
      );
    } catch (err) {
      console.error("error adding or editing note", err);
    }
    return response;
  };

  const addTask = async (taskDetails) => {
    let response;
    try {
      response = await API.graphql({
        query: mutations.createTask,
        variables: { input: taskDetails },
      });
    } catch (err) {
      console.error(err);
    }
    if (response) {
      console.log("success", response.data.createTask);
      return response;
    }
  };

  const removeClient = async (clientId, index) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.deleteClient, { input: { id: clientId } })
      );
    } catch (err) {
      console.error(err);
    }
    removeClientFromArrayByIndex(index);
    return response;
  };

  return {
    updateFavorite,
    updateClient,
    addConnection,
    addEditNote,
    addTask,
    removeClient,
  };
}

export default useClient;
