import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listClientGroupsWithClients } from "../graphql/customQueries";
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

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.status = "succeeded";
      clientsAdapter.upsertMany(state, action.payload);
    });
  },
});

export const {
  selectAll: selectAllClients,
  selectById: selectClientById,
  selectIds: selectClientIds,
} = clientsAdapter.getSelectors((state) => state.clients);

export default clientsSlice.reducer;
