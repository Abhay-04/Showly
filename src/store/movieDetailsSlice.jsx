import { createSlice } from "@reduxjs/toolkit";

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    
  },
  reducers: {
    addMovieDetailsData: (state, action) => {
      state.info = action.payload;
    },
    removeMovieDetailsData: (state) => {
      state.info = {};
    },
  },
});

export const { addMovieDetailsData, removeMovieDetailsData } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
