import { createSlice, configureStore } from "@reduxjs/toolkit";
import clientReducer from "./client-slice";
import groupReducer from "./group-slice";

const store = configureStore({
  reducer: { client: clientReducer, groups: groupReducer },
});

export default store;
