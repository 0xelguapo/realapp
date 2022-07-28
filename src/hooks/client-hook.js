import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

function useClient() {
  const updateFavorite = async (id, favorite) => {
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
  };

  const updateClient = async (details) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.updateClient, { input: details })
      );
    } catch (err) {
      console.error("error adding favorite", err);
    }
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

  return { updateFavorite, updateClient, addConnection, addEditNote };
}

export default useClient;
