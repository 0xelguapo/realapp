import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createDeal, deleteDeal, updateDeal } from "../graphql/mutations";
import { listDeals } from "../graphql/queries";

const dealsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = dealsAdapter.getInitialState({
  status: "idle",
  errors: null,
});

export const fetchDeals = createAsyncThunk("deals/fetchDeals", async () => {
  let response;
  try {
    response = await API.graphql(graphqlOperation(listDeals));
  } catch (err) {
    console.error(err);
  }
  return response.data.listDeals.items;
});

export const addDeal = createAsyncThunk(
  "deals/addDeal",
  async (dealDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createDeal, { input: dealDetails })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.createDeal;
  }
);

export const removeDeal = createAsyncThunk(
  "deals/removeDeal",
  async (dealId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(deleteDeal, { input: { id: dealId } })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.deleteDeal;
  }
);

export const editDeal = createAsyncThunk(
  "deals/editDeal",
  async (dealDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(updateDeal, { input: dealDetails })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.updateDeal;
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    handleDealsOnDeleteClient(state, action) {
      for (const deal in state.entities) {
        const dealId = state.entities[deal].clientId;
        if (dealId === action.payload) {
          dealsAdapter.removeOne(state, deal);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        dealsAdapter.upsertMany(state, action.payload);
      })
      .addCase(removeDeal.fulfilled, (state, action) => {
        dealsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(editDeal.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(addDeal.fulfilled, (state, action) => {
        dealsAdapter.addOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllDeals,
  selectById: selectDealsById,
  selectIds: selectDealIds,
} = dealsAdapter.getSelectors((state) => state.deals);

export default dealsSlice.reducer;
