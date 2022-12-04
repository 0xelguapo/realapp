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

export const editPropertyGroupTitle = createAsyncThunk(
  "propertyGroups/editTitle",
  async ({ id, title }) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(updatePropertyGroup, { input: { id, title } })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.updatePropertyGroup;
  }
);

export const removeMultiplePropertiesFromGroup = createAsyncThunk(
  "propertyGroups/remove",
  async (removeDetails) => {
    let response;
    const { removeIDs, groupID } = removeDetails;
    const promises = removeIDs.map((removeID) => {
      return API.graphql(
        graphqlOperation(deleteGroupsProperty, { input: { id: removeID } })
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

export const propertyGroupsSlice = createSlice({
  name: "propertyGroups",
  initialState,
  reducers: {
    handlePropertyGroupsOnDeleteProperty: (state, action) => {
      for (const propertyGroup in state.entities) {
        const propertiesArray = state.entities[propertyGroup].properties.items;
        for (let i = 0; i < propertiesArray.length; i++) {
          if (propertiesArray[i].property.id === action.payload) {
            state.entities[propertyGroup].properties.items.splice(i, 1);
            break;
          }
        }
      }
    },
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
      })
      .addCase(editPropertyGroupTitle.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        state.entities[id].title = title;
      })
      .addCase(removePropertyFromGroup.fulfilled, (state, action) => {
        const { propertyGroupID, id } = action.payload;
        const indexToRemove = state.entities[
          propertyGroupID
        ].properties.items.findIndex((item) => item.id === id);
        state.entities[propertyGroupID].properties.items.splice(
          indexToRemove,
          1
        );
      })
      .addCase(removeMultiplePropertiesFromGroup.fulfilled, (state, action) => {
        const updatedProperties = state.entities[
          action.payload.groupID
        ].properties.items.filter(
          (el) => !action.payload.removeIDs.includes(el.id)
        );
        state.entities[action.payload.groupID].properties.items =
          updatedProperties;
      });
  },
});

export const {
  selectAll: selectAllPropertyGroups,
  selectById: selectPropertyGroupById,
  selectIds: selectPropertyGroupIds,
} = propertyGroupsAdapter.getSelectors((state) => state.propertyGroups);

export const { handlePropertyGroupsOnDeleteProperty } =
  propertyGroupsSlice.actions;

export default propertyGroupsSlice.reducer;
