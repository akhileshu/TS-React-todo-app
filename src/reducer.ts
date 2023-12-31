

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//*interface
interface StateType {
  count: number;
}
const initialState: StateType = { count: 0 };

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: StateType) => state.count; //if only one reducer

// export const selectCount = (state: { myReducer: StateType }) => state.myReducer.count; // if multiple reducers

export default counterSlice.reducer;
