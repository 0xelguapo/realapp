import { createSlice, configureStore } from "@reduxjs/toolkit";
import clientReducer from "./client-slice";

const store = configureStore({
  reducer: { client: clientReducer },
});

export default store;
