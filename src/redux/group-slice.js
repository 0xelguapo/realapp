import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listClientGroupsWithClients } from "../graphql/customQueries";
import * as mutations from "../graphql/mutations";

const initialState = {
  groups: [],
  status: "idle",
  error: null,
};

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
        graphqlOperation(mutations.updateClientGroup,
        {
          input: groupDetails,
        }
      ));
    } catch (err) {
      console.error(err);
    }
    if (response) {
      console.log(response)
      return response.data.updateClientGroup;
    }
  }
);

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error);
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(editGroupName.fulfilled, (state, action) => {
        console.log(action.payload)
        const index = state.groups.findIndex(
          (group) => group.id === action.payload.id
        );
        state.groups[index] = action.payload;
      });
  },
});

export const selectAllGroups = (state) => state.groups.groups;

export const selectGroupById = (state, groupId) =>
  state.groups.groups.find((group) => group.id === groupId);

export default groupSlice.reducer;
