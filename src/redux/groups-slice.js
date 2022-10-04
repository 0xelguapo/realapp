import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listClientGroupsWithClients } from "../graphql/customQueries";
import * as mutations from "../graphql/mutations";

const groupsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = groupsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchGroups = createAsyncThunk(
  "groups/fetchAllGroups",
  async () => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(listClientGroupsWithClients)
      );
    } catch (err) {
      console.error(err);
    }
    if (response) {
      const allGroupsResponse = response.data.listClientGroups.items;
      return allGroupsResponse;
    }
  }
);

export const addGroup = createAsyncThunk("groups/addGroup", async (title) => {
  let response;
  try {
    response = await API.graphql(
      graphqlOperation(mutations.createClientGroup, {
        input: { title: title },
      })
    );
  } catch (err) {
    console.error(err);
  }
  if (response) {
    return response.data.createClientGroup;
  }
});

export const editGroupName = createAsyncThunk(
  "groups/editGroupName",
  async (groupDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.updateClientGroup, {
          input: groupDetails,
        })
      );
    } catch (err) {
      console.error(err);
    }
    if (response) {
      return response.data.updateClientGroup;
    }
  }
);

export const removeMultipleClientsFromGroup = createAsyncThunk(
  "groups/removeMultipleClientsFromGroup",
  async (removeDetails) => {
    let response;
    const { removeIDs, groupID } = removeDetails;
    const promises = removeIDs.map((removeID) => {
      return API.graphql(
        graphqlOperation(mutations.deleteGroupsClients, {
          input: { id: removeID },
        })
      );
    });
    try {
      response = await Promise.all(promises);
    } catch (err) {
      console.error(err);
    }
    if (response) {
      return { removeIDs, groupID };
    }
  }
);

export const removeClientFromGroup = createAsyncThunk(
  "groups/removeClientFromGroup",
  async (removeDetails) => {
    const { clientGroupID, groupID, clientID } = removeDetails;
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.deleteGroupsClients, {
          input: {
            id: clientGroupID,
          },
        })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data;
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (groupID) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(mutations.deleteClientGroup, {
          input: { id: groupID },
        })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.deleteClientGroup;
  }
);

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    handleGroupsOnDeleteClient(state, action) {
      for (const group in state.entities) {
        const clientsArray = state.entities[group].clients.items;
        for (let i = 0; i < clientsArray.length; i++) {
          if (clientsArray[i].client.id === action.payload) {
            state.entities[group].clients.items.splice(i, 1)
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        groupsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error);
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        groupsAdapter.addOne(state, action.payload);
      })
      .addCase(editGroupName.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        state.entities[id].title = title;
      })
      .addCase(removeMultipleClientsFromGroup.fulfilled, (state, action) => {
        const updatedClients = state.entities[
          action.payload.groupID
        ].clients.items.filter(
          (el) => !action.payload.removeIDs.includes(el.id)
        );
        state.entities[action.payload.groupID].clients.items = updatedClients;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        groupsAdapter.removeOne(state, action.payload.id);
      });
  },
});

export const {
  selectAll: selectAllGroups,
  selectById: selectGroupById,
  selectIds: selectGroupIds,
} = groupsAdapter.getSelectors((state) => state.groups);

export const { handleGroupsOnDeleteClient } = groupsSlice.actions;

export default groupsSlice.reducer;
