import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import {
  createClient,
  updateClient,
  deleteGroupsClients,
  deleteClient,
  deleteReminder,
} from "../graphql/mutations";
import { listClients, getClient } from "../graphql/queries";

const clientsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = clientsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(listClients));
    } catch (err) {
      console.error(err);
    }
    return response.data.listClients.items;
  }
);

export const fetchOneClient = createAsyncThunk(
  "clients/fetchOneClient",
  async (clientId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(getClient, { id: clientId })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.getClient;
  }
);

export const addClient = createAsyncThunk(
  "clients/addClient",
  async (clientInputs) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createClient, { input: clientInputs })
      );
    } catch (err) {
      console.error("error creating client", err);
    }
    return response.data.createClient;
  }
);

export const updateFavorite = createAsyncThunk(
  "clients/updateFavorite",
  async (clientDetails) => {
    const { id, favorite } = clientDetails;
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(updateClient, {
          input: { id: id, favorite: favorite },
        })
      );
    } catch (err) {
      console.error("error updating favorite", err);
    }
    return response.data.updateClient;
  }
);

export const removeClient = createAsyncThunk(
  "clients/removeClient",
  async (clientId) => {
    let response;
    let deleteGroupClientResponse;
    let deleteRemindersResponse;
    let client;

    try {
      client = await API.graphql(graphqlOperation(getClient, { id: clientId }));
    } catch (err) {
      console.error("error retrieving client", err);
      return;
    }

    const groupPromises = client.data.getClient.group.items.map((group) => {
      return API.graphql(
        graphqlOperation(deleteGroupsClients, {
          input: { id: group.id },
        })
      );
    });

    try {
      deleteGroupClientResponse = await Promise.all(groupPromises);
      console.log(deleteGroupClientResponse);
    } catch (err) {
      console.error("error delete group clients", err);
      return err;
    }

    const remindersPromises = client.data.getClient.reminder.items.map(
      (reminder) => {
        return API.graphql(
          graphqlOperation(deleteReminder, { input: { id: reminder.id } })
        );
      }
    );

    try {
      deleteRemindersResponse = await Promise.all(remindersPromises);
    } catch (err) {
      console.error("error deleting reminders", err);
      return err;
    }

    if (deleteGroupClientResponse) {
      try {
        response = await API.graphql(
          graphqlOperation(deleteClient, { input: { id: clientId } })
        );
      } catch (err) {
        console.error("error removing client", err);
      }
      console.log(response.data.deleteClient);
    }
    return response.data.deleteClient;
  }
);

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        clientsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchOneClient.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        clientsAdapter.addOne(state, action.payload);
      })
      .addCase(updateFavorite.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(removeClient.fulfilled, (state, action) => {
        clientsAdapter.removeOne(state, action.payload.id);
      });
  },
});

export const {
  selectAll: selectAllClients,
  selectById: selectClientById,
  selectIds: selectClientIds,
} = clientsAdapter.getSelectors((state) => state.clients);

export default clientsSlice.reducer;
