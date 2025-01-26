import { createSlice } from "@reduxjs/toolkit";


const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    info: null,
    movieTrailerPlay : false,
    
  },
  reducers: {
    addMovieDetailsData: (state, action) => {
      state.info = action.payload;
    },
    removeMovieDetailsData: (state) => {
      state.info = null;
    },

    toggleMovieTrailerPlay: (state) => {
      state.movieTrailerPlay = !state.movieTrailerPlay;
    },
  },
});

export const { addMovieDetailsData, removeMovieDetailsData , toggleMovieTrailerPlay} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
