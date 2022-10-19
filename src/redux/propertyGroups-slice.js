import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import {
  createPropertyGroup,
  updatePropertyGroup,
  createGroupsProperty,
} from "../graphql/mutations";
import { listPropertyGroups, getPropertyGroup } from "../graphql/queries";

const propertyGroupsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = propertyGroupsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchPropertyGroups = createAsyncThunk(
  "propertyGroups/fetchAllPropertyGroups",
  async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(listPropertyGroups));
    } catch (err) {
      console.error(err);
    }
    return response.data.listPropertyGroups.items;
  }
);

export const addPropertyGroup = createAsyncThunk(
  "propertyGroups/addPropertyGroup",
  async (title) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createPropertyGroup, { input: { title: title } })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.createPropertyGroup;
  }
);

export const addPropertyToGroup = createAsyncThunk(
  "propertyGroups/addPropertyToGroup",
  async (details) => {
    const { propertyID, propertyGroupID } = details;
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createGroupsProperty, {
          input: { propertyID, propertyGroupID },
        })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.createGroupsProperty;
  }
);

export const propertyGroupsSlice = createSlice({
  name: "propertyGroups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        propertyGroupsAdapter.upsertMany(state, action.payload);
      })
      .addCase(addPropertyGroup.fulfilled, (state, action) => {
        propertyGroupsAdapter.addOne(state, action.payload);
      })
      .addCase(addPropertyToGroup.fulfilled, (state, action) => {
        state.entities[action.payload.propertyGroupID].properties.items.push(
          action.payload
        );
      });
  },
});

export const {
  selectAll: selectAllPropertyGroups,
  selectById: selectPropertyGroupById,
  selectIds: selectPropertyGroupIds,
} = propertyGroupsAdapter.getSelectors((state) => state.propertyGroups);

export default propertyGroupsSlice.reducer;
