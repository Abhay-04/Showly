import { createSlice } from "@reduxjs/toolkit";

const personDetailsSlice = createSlice({
  name: "personDetails",
  initialState: {},
  reducers: {
    addPersonDetailsData: (state, action) => {
      state.info = action.payload;
    },
    removePersonDetailsData: (state) => {
      state.info = {};
    },
  },
});

export const { addPersonDetailsData, removePersonDetailsData } =
  personDetailsSlice.actions;

export default personDetailsSlice.reducer;
