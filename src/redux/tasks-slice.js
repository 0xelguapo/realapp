import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createTask, deleteTask, updateTask } from "../graphql/mutations";
import { listTasks } from "../graphql/queries";

const tasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => a?.date.localeCompare(b?.date),
});

const initialState = tasksAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchTasks = createAsyncThunk("tasks/fetchAllTasks", async () => {
  let response;
  try {
    response = await API.graphql(graphqlOperation(listTasks));
  } catch (err) {
    console.error(err);
  }
  return response.data.listTasks.items;
});

export const addTask = createAsyncThunk(
  "task/createTask",
  async (taskDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createTask, { input: taskDetails })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.createTask;
  }
);

export const completeTask = createAsyncThunk(
  "task/completeTask",
  async (taskDetails) => {
    const { id, completed } = taskDetails;
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(updateTask, {
          input: { id: id, completed: completed },
        })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.updateTask;
  }
);

export const removeOneTask = createAsyncThunk(
  "task/removeOneTask",
  async (taskId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(deleteTask, { input: { id: taskId } })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.deleteTask;
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        tasksAdapter.upsertMany(state, action.payload);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload);
      })
      .addCase(removeOneTask.fulfilled, (state, action) => {
        tasksAdapter.removeOne(state, action.payload.id);
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      });
  },
});

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors((state) => state.tasks);

export default tasksSlice.reducer;
