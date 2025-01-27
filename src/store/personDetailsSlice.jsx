import { createSlice } from "@reduxjs/toolkit";
import { info } from "autoprefixer";

const personDetailsSlice = createSlice({
  name: "personDetails",
  initialState: {
    info: null,
  },
  reducers: {
    addPersonDetailsData: (state, action) => {
      state.info = action.payload;
    },
    removePersonDetailsData: (state) => {
      state.info = null;
    },
  },
});

export const { addPersonDetailsData, removePersonDetailsData } =
  personDetailsSlice.actions;

export default personDetailsSlice.reducer;
