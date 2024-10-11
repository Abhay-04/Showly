import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaingMovies: [],
    randomNowPlayingMovie: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlaingMovies = action.payload;
    },
    addRandomNowPlayingMovie: (state, action) => {
      state.randomNowPlayingMovie = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addRandomNowPlayingMovie } =
  moviesSlice.actions;

export default moviesSlice.reducer;
