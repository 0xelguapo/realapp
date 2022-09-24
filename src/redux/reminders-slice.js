import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import * as customQueries from "../graphql/customQueries";
import { parseISO, differenceInCalendarDays } from "date-fns";

const remindersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localCompare(a.createdAt),
});

const initialState = remindersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {
  selectAll: selectAllReminders,
  selectById: selectReminderById,
  selectIds: selectReminderIds,
} = remindersAdapter.getSelectors((state) => state.reminders);

export default remindersSlice.reducer;
