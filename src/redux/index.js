import { createSlice, configureStore } from "@reduxjs/toolkit";
import clientReducer from "./client-slice";
import groupReducer from "./group-slice";
import remindersReducer from "./reminders-slice";

const store = configureStore({
  reducer: {
    client: clientReducer,
    groups: groupReducer,
    reminders: remindersReducer,
  },
});

export default store;
