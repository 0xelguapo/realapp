import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clients-slice";
import groupsReducer from "./groups-slice";
import remindersReducer from "./reminders-slice";
import tasksReducer from "./tasks-slice";
import propertiesReducer from "./properties-slice";
import propertyGroupsReducer from "./propertyGroups-slice";
import goalsReducer from './goals-slice'
import dealsReducer from './deals-slice'
import connectionsReducer from './connections-slice'

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    groups: groupsReducer,
    reminders: remindersReducer,
    tasks: tasksReducer,
    properties: propertiesReducer,
    propertyGroups: propertyGroupsReducer,
    goals: goalsReducer,
    deals: dealsReducer,
    connections: connectionsReducer
  },
});

export default store;
