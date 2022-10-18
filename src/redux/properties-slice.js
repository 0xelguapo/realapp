import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation, grpahqlOperation } from "aws-amplify";
import { createProperty, updateProperty } from "../graphql/mutations";
import { listProperties, getProperty } from "../graphql/queries";

const propertiesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.street.localeCompare(b.street),
});

const initialState = propertiesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchProperties = createAsyncThunk(
  "properties/fetchAllProperties",
  async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(listProperties));
    } catch (err) {
      console.error(err);
    }
    return response.data.listProperties.items;
  }
);

export const fetchOneProperty = createAsyncThunk(
  "properties/fetchOneProperty",
  async (propertyId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(getProperty, { id: propertyId })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.getProperty;
  }
);

export const addProperty = createAsyncThunk(
  "properties/createProperty",
  async (propertyInputs) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createProperty, { input: propertyInputs })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.createProperty;
  }
);

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        propertiesAdapter.upsertMany(state, action.payload);
      }).addCase(fetchOneProperty.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        propertiesAdapter.addOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllProperties,
  selectById: selectPropertyById,
  selectIds: selectPropertyIds,
} = propertiesAdapter.getSelectors((state) => state.properties);

export default propertiesSlice.reducer;
