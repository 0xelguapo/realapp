import { useCallback } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

function useClient() {
  const updateFavorite = useCallback(async (id, favorite) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.updateClient, {
          input: { id: id, favorite: favorite },
        })
      );
    } catch (err) {
      console.error("error adding favorite", err);
    }
    return response;
  }, []);

  const updateClient = useCallback(async (details) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.updateClient, { input: details })
      );
    } catch (err) {
      console.error("error adding favorite", err);
    }
  }, []);

  const addConnection = useCallback(async (inputDetails) => {
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
  }, []);

  return { updateFavorite, updateClient, addConnection };
}

export default useClient;
