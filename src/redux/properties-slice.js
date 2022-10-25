import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import {
  createProperty,
  createTask,
  deleteProperty,
  updateProperty,
} from "../graphql/mutations";
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

export const editProperty = createAsyncThunk(
  "properties/editProperty",
  async (propertyDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(updateProperty, { input: propertyDetails })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.updateProperty;
  }
);

export const removeProperty = createAsyncThunk(
  "properties/removeProperty",
  async (id) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(deleteProperty, { input: { id: id } })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.deleteProperty;
  }
);

export const addPropertyTask = createAsyncThunk(
  "properties/addTask",
  async (taskInputs) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createTask, { input: taskInputs })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.createTask;
  }
);

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    handleAddPropertyToGroup: (state, action) => {
      state.entities[action.payload.propertyId].group.items.push(
        action.payload
      );
    },
    handleRemovePropertyFromGroup: (state, action) => {
      const { propertyId, propertyGroupID } = action.payload;
      const indexToRemove = state.entities[propertyId].group.items.findIndex(
        (item) => item.propertyGroupID === propertyGroupID
      );
      state.entities[propertyId].group.items.splice(indexToRemove, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        propertiesAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchOneProperty.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        propertiesAdapter.addOne(state, action.payload);
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        propertiesAdapter.removeOne(state, action.payload.id);
      }).addCase(addPropertyTask.fulfilled, (state, action) => {
        state.entities[action.payload.propertyId].tasks.items.push(action.payload)
      })
  },
});

export const {
  selectAll: selectAllProperties,
  selectById: selectPropertyById,
  selectIds: selectPropertyIds,
} = propertiesAdapter.getSelectors((state) => state.properties);

export const { handleAddPropertyToGroup, handleRemovePropertyFromGroup } =
  propertiesSlice.actions;

export default propertiesSlice.reducer;
