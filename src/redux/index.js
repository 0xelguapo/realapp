import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clients-slice";
import groupsReducer from "./groups-slice";
import remindersReducer from "./reminders-slice";
import tasksReducer from "./tasks-slice";

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    groups: groupsReducer,
    reminders: remindersReducer,
    tasks: tasksReducer,
  },
});

export default store;
