import { createSlice } from "@reduxjs/toolkit";

const tvDetailsSlice = createSlice({
  name: "tvDetails",
  initialState: {
    info: null,
    tvTrailerPlay : false,
    
  },
  reducers: {
    addTvDetailsData: (state, action) => {
      state.info = action.payload;
    },
    removeTvDetailsData: (state) => {
      state.info = null;
    },
    toggleTvTrailerPlay: (state) => {
      state.tvTrailerPlay = !state.tvTrailerPlay;
    },
  },
});

export const { addTvDetailsData , removeTvDetailsData , toggleTvTrailerPlay} = tvDetailsSlice.actions;

export default tvDetailsSlice.reducer;
