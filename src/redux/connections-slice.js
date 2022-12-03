import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { deleteConnectionHistory } from "../graphql/mutations";
import { listConnectionHistories } from "../graphql/queries";

const connectionsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = connectionsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchConnections = createAsyncThunk(
  "connections/fetchConnections",
  async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(listConnectionHistories));
    } catch (err) {
      console.error(err);
    }
    return response.data.listConnectionHistories.items;
  }
);

export const removeConnection = createAsyncThunk(
  "connections/removeConnection",
  async (connectionId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(deleteConnectionHistory, { input: { id: connectionId } })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.deleteConnectionHistory;
  }
);

export const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnections.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.status = "succeeded";
        connectionsAdapter.upsertMany(state, action.payload);
      })
      .addCase(removeConnection.fulfilled, (state, action) => {
        connectionsAdapter.removeOne(state, action.payload.id);
      });
  },
});

export const {
  selectAll: selectAllConnections,
  selectById: selectConnectionById,
} = connectionsAdapter.getSelectors((state) => state.connections);

export default connectionsSlice.reducer;
