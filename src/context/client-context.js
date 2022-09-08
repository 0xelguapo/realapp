import { useState, createContext, useCallback } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { Alert } from "react-native";

const ClientsContext = createContext();

function ClientContextProvider({ children }) {
  const [clientsArray, setClientsArray] = useState([]);
  const [favoriteClients, setFavoriteClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);

  const getAllClients = useCallback(async () => {
    setIsLoading(true);
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.listClients));
    } catch (err) {
      console.log("error getting clients", err);
    }
    if (response) {
      setClientsArray(response.data.listClients.items);
    }
    setIsLoading(false);
    return response
  }, []);

  const getOneClient = useCallback(async (clientId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(queries.getClient, { id: clientId })
      );
    } catch (err) {
      console.error(err);
    }
    console.log('gettingOneClient')
    return response;
  }, []);

  const mutateClientsArrayByIndex = (modifiedClient, index) => {
    let newClientsArray = [...clientsArray];
    newClientsArray[index] = modifiedClient;
    setClientsArray(newClientsArray);
  };

  const removeClientFromArrayByIndex = (index) => {
    let newClientsArray = [...clientsArray];
    newClientsArray.splice(index, 1);
    setClientsArray(newClientsArray);
  }

  const onSuccess = () => {
    setSuccessStatus(true);
    setTimeout(() => {
      setSuccessStatus(false);
    }, 4000);
  };

  const addClient = async (formState, clientDetails) => {
    let response;
    let newClientsArray = [];
    if (!formState.inputs.name.value) {
      Alert.alert("Required Field Empty", "Please add a name");
    } else {
      try {
        response = await API.graphql(
          graphqlOperation(mutations.createClient, { input: clientDetails })
        );
      } catch (err) {
        console.log("error creating client", err);
      }
    }
    if (response) {
      newClientsArray = [response.data.createClient, ...clientsArray];
      setClientsArray(newClientsArray);
      onSuccess();
      return response;
    }
    console.log(response);
  };

  const getFavoriteClients = async () => {
    let response;
    let filter = {
      favorite: {
        eq: true,
      },
    };
    try {
      response = await API.graphql({
        query: queries.listClients,
        variables: { filter: filter },
      });
    } catch (err) {
      console.error(err);
    }
    if (response.data.listClients.items) {
      setFavoriteClients(response.data.listClients.items);
    }
    console.log('gettingFavoriteClients')
    return response;
  };


  return (
    <ClientsContext.Provider
      value={{
        clientsArray,
        favoriteClients,
        isLoading,
        successStatus,
        getAllClients,
        getOneClient,
        addClient,
        getFavoriteClients,
        mutateClientsArrayByIndex,
        removeClientFromArrayByIndex,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

export { ClientsContext, ClientContextProvider };
