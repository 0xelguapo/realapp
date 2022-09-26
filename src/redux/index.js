import { createSlice, configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clients-slice";
import groupReducer from "./groups-slice";
import remindersReducer from "./reminders-slice";

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    groups: groupReducer,
    reminders: remindersReducer,
  },
});

export default store;
