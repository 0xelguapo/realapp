import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listClientsWithGroups } from "../graphql/customQueries";
import {
  createClient,
  updateClient,
  deleteGroupsClients,
  deleteClient,
  deleteReminder,
} from "../graphql/mutations";
import { listClients, getClient } from "../graphql/queries";

const clientsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.firstName.localeCompare(b.firstName),
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

export const fetchClientsWithGroups = createAsyncThunk(
  "clients/fetchClientsWithGroups",
  async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(listClientsWithGroups));
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

export const editClient = createAsyncThunk(
  "clients/editClient",
  async (clientDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(updateClient, { input: clientDetails })
      );
    } catch (err) {
      console.error(err);
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
    }
    return response.data.deleteClient;
  }
);

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    handleAddClientToGroup: (state, action) => {
      if (!state.entities[action.payload.clientId].group.items) {
        state.entities[action.payload.clientId].group.items = [];
      }
      state.entities[action.payload.clientId].group.items.push(action.payload);
    },
    handleRemoveClientFromGroup: (state, action) => {
      const { clientId, clientGroupID, id } = action.payload;
      const indexToRemove = state.entities[clientId].group.items.findIndex(
        (item) => item.clientGroupID === clientGroupID
      );
      state.entities[clientId].group.items.splice(indexToRemove, 1);
    },
    handleClientAfterDeleteReminder: (state, action) => {
      const { clientId, reminderId } = action.payload;
      const reminderIndexToRemove = state.entities[
        clientId
      ].reminder.items.findIndex((el) => el.id === reminderId);
      state.entities[clientId].reminder.items.splice(reminderIndexToRemove, 1);
    },
    handleClientAfterDeleteConnection: (state, action) => {
      const { clientId, connectionId } = action.payload;
      let indextoRemove;
      if (state.entities[clientId]?.connectionHistory?.items?.length > 0) {
        indextoRemove = state.entities[
          clientId
        ]?.connectionHistory?.items.findIndex((el) => el.id === connectionId);

        state.entities[clientId].connectionHistory.items.splice(
          connectionIndexToRemove,
          1
        );
      }
    },
    handleClientAfterAddReminder: (state, action) => {
      const { clientId } = action.payload;
      state.entities[clientId].reminder.items.push(action.payload)
    }
  },
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
      })
      .addCase(editClient.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(fetchClientsWithGroups.fulfilled, (state, action) => {
        for (let i = 0; i < action.payload.length; i++) {
          if (action.payload[i].group.items.length > 0) {
            state.entities[action.payload[i].id].group.items =
              action.payload[i].group.items;
          } else continue;
        }
      });
  },
});

export const {
  selectAll: selectAllClients,
  selectById: selectClientById,
  selectIds: selectClientIds,
} = clientsAdapter.getSelectors((state) => state.clients);

export const {
  handleAddClientToGroup,
  handleRemoveClientFromGroup,
  handleClientAfterDeleteReminder,
  handleClientAfterDeleteConnection,
handleClientAfterAddReminder,
} = clientsSlice.actions;

export default clientsSlice.reducer;
