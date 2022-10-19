import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clients-slice";
import groupsReducer from "./groups-slice";
import remindersReducer from "./reminders-slice";
import tasksReducer from "./tasks-slice";
import propertiesReducer from "./properties-slice";
import propertyGroupsReducer from "./propertyGroups-slice";

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    groups: groupsReducer,
    reminders: remindersReducer,
    tasks: tasksReducer,
    properties: propertiesReducer,
    propertyGroups: propertyGroupsReducer
  },
});

export default store;
