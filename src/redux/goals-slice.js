import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createGoal, deleteGoal, updateGoal } from "../graphql/mutations";
import { listGoals } from "../graphql/queries";

const goalsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a?.title.localeCompare(b?.title),
});

const initialState = goalsAdapter.getInitialState({
  status: "idle",
  errors: null,
});

export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
  let response;
  try {
    response = await API.graphql(graphqlOperation(listGoals));
  } catch (err) {
    console.error(err);
  }
  return response.data.listGoals.items;
});

export const addGoal = createAsyncThunk(
  "goals/addGoal",
  async (goalDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createGoal, { input: goalDetails })
      );
    } catch (err) {
      console.err(err);
    }
    return response.data.createGoal;
  }
);

export const editGoal = createAsyncThunk(
  "goals/updateGoal",
  async (goalDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(updateGoal, { input: goalDetails })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.updateGoal;
  }
);

export const removeGoal = createAsyncThunk(
  "goals/removeGoal",
  async (goalId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(deleteGoal, { input: { id: goalId } })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.deleteGoal;
  }
);

export const resetGoals = createAsyncThunk(
  "goals/resetGoals",
  async (arrayOfIds) => {
    let promiseResult;

    const promises = arrayOfIds.map((id) =>
      API.graphql(
        graphqlOperation(updateGoal, { input: { id: id, timesCompleted: "0" } })
      )
    );

    try {
      promiseResult = await Promise.all(promises);
    } catch (err) {
      console.error(err);
    }

    return promiseResult
  }
);

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        goalsAdapter.upsertMany(state, action.payload);
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        goalsAdapter.addOne(state, action.payload);
      })
      .addCase(editGoal.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(removeGoal.fulfilled, (state, action) => {
        goalsAdapter.removeOne(state, action.payload.id);
      })
      .addCase(resetGoals.fulfilled, (state, action) => {
        for(const obj of action.payload) {
          state.entities[obj.data.updateGoal.id] = obj.data.updateGoal
        }
      });
  },
});

export const {
  selectAll: selectAllGoals,
  selectById: selectGoalsById,
  selectIds: selectGoalIds,
} = goalsAdapter.getSelectors((state) => state.goals);

export default goalsSlice.reducer;
