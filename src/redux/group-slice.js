import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listClientGroupsWithClients } from "../graphql/customQueries";

const initialState = {
  groups: [],
};

const fetchGroups = createAsyncThunk("groups/fetchAllGroups", async () => {
  let response;
  try {
    response = await API.graphql(graphqlOperation(listClientGroupsWithClients));
  } catch (err) {
    console.error(err);
  }
  const allGroupsResponse = response.data.listClientGroups.items;
  return allGroupsResponse;
});

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.groups.push(action.payload);
    });
  },
});

export const selectAllGroups = (state) => state.groups.groups

export default groupSlice.reducer;
