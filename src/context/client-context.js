import { useState, createContext, useCallback, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import { Alert } from "react-native";

const ClientsContext = createContext();

function ClientContextProvider({ children }) {
  const [clientsArray, setClientsArray] = useState([]);
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
  }, []);

  const getOneClient = useCallback(async (clientId) => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(queries.getClient, {id: clientId}))
    } catch (err) {
      console.error(err)
    }
    return response;
  }, [])

  useEffect(() => {
    getAllClients();
    console.log("gettingAllClients");
  }, []);

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

  const handleFavorite = async (details) => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(mutations.updateClient, { input: details }));
    } catch(err) {
      console.error('error adding favorite', err)
    }
    return response
  }
  
  const addConnection = async (inputDetails) => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(mutations.createConnectionHistory, {input: inputDetails}))
    } catch (err) {
      console.error('error adding connection', err)
    }
    console.log(response)
    return response;
  }


  return (
    <ClientsContext.Provider
      value={{
        clientsArray,
        isLoading,
        successStatus,
        getAllClients,
        getOneClient,
        addClient,
        handleFavorite,
        addConnection
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

export { ClientsContext, ClientContextProvider };
