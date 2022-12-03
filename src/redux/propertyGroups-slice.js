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
  deleteGroupsProperty,
} from "../graphql/mutations";
import { listPropertyGroups, getPropertyGroup } from "../graphql/queries";
import { listPropertyGroupsWithProperties } from "../graphql/customQueries";

const propertyGroupsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
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
      response = await API.graphql(
        graphqlOperation(listPropertyGroupsWithProperties)
      );
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

export const removePropertyFromGroup = createAsyncThunk(
  "propertyGroups/removePropertyFromGroup",
  async (groupPropertyID) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(deleteGroupsProperty, {
          input: { id: groupPropertyID },
        })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.deleteGroupsProperty;
  }
);

export const propertyGroupsSlice = createSlice({
  name: "propertyGroups",
  initialState,
  reducers: {
    handlePropertyGroupsOnDeleteProperty: (state, action) => {
      for(const propertyGroup in state.entities) {
        const propertiesArray = state.entities[propertyGroup].properties.items;
        for(let i = 0; i < propertiesArray.length; i++) {
          if(propertiesArray[i].property.id === action.payload) {
            state.entities[propertyGroup].properties.items.splice(i, 1)
            break;
          }

        }
      }
    }
  },
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
      }).addCase(removePropertyFromGroup.fulfilled, (state, action) => {
        const { propertyGroupID, id } = action.payload;
        const indexToRemove = state.entities[propertyGroupID].properties.items.findIndex(item => item.id === id);
        state.entities[propertyGroupID].properties.items.splice(indexToRemove, 1)
      })
  },
});

export const {
  selectAll: selectAllPropertyGroups,
  selectById: selectPropertyGroupById,
  selectIds: selectPropertyGroupIds,
} = propertyGroupsAdapter.getSelectors((state) => state.propertyGroups);

export const { handlePropertyGroupsOnDeleteProperty } = propertyGroupsSlice.actions

export default propertyGroupsSlice.reducer;
