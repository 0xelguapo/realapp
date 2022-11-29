import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { listReminders } from "../graphql/customQueries";
import {
  deleteReminder,
  createReminder,
  updateReminder,
} from "../graphql/mutations";

const remindersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.freq.localeCompare(b.freq),
});

const initialState = remindersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchReminders = createAsyncThunk(
  "reminders/fetchAllReminders",
  async () => {
    let response;
    try {
      response = await API.graphql(graphqlOperation(listReminders));
    } catch (err) {
      console.error(err);
    }
    return response.data.listReminders.items;
  }
);

export const deleteOneReminder = createAsyncThunk(
  "reminders/deleteReminder",
  async (reminderId) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(deleteReminder, {
          input: { id: reminderId },
        })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.deleteReminder;
  }
);

export const createOneReminder = createAsyncThunk(
  "reminders/createReminder",
  async (reminderDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createReminder, { input: reminderDetails })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.createReminder;
  }
);

export const completeReminder = createAsyncThunk(
  "reminders/completeReminder",
  async (reminderDetails) => {
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(updateReminder, { input: reminderDetails })
      );
    } catch (err) {
      console.error(err);
    }
    return response.data.updateReminder;
  }
);

export const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    handleRemindersOnDeleteClient(state, action) {
      for (const reminder in state.entities) {
        const clientId = state.entities[reminder].clientId;
        if (clientId === action.payload) {
          remindersAdapter.removeOne(state, reminder);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReminders.fulfilled, (state, action) => {
        remindersAdapter.upsertMany(state, action.payload);
      })
      .addCase(deleteOneReminder.fulfilled, (state, action) => {
        remindersAdapter.removeOne(state, action.payload.id);
      })
      .addCase(createOneReminder.fulfilled, (state, action) => {
        remindersAdapter.addOne(state, action.payload);
      }).addCase(completeReminder.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload
      })
  },
});

export const {
  selectAll: selectAllReminders,
  selectById: selectReminderById,
  selectIds: selectReminderIds,
} = remindersAdapter.getSelectors((state) => state.reminders);

export const { handleRemindersOnDeleteClient } = remindersSlice.actions;

export default remindersSlice.reducer;
