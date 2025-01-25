import { createSlice } from "@reduxjs/toolkit";

const tvDetailsSlice = createSlice({
  name: "tvDetails",
  initialState: {
    info: null
    
  },
  reducers: {
    addTvDetailsData: (state, action) => {
      state.info = action.payload;
    },
    removeTvDetailsData: (state) => {
      state.info = null;
    },
  },
});

export const { addTvDetailsData , removeTvDetailsData} = tvDetailsSlice.actions;

export default tvDetailsSlice.reducer;
