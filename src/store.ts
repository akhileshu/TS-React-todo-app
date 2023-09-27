import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./reducer"; // use createSlice

export const store = configureStore({
  // if only one reducer
  reducer: countReducer,

  //  if multiple reducers
  //  reducer: {
  //   myReducer: countReducer,

  // },
});
