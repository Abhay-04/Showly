import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    randomNowPlayingMovie: null,
    randomMovieId: null,
    randomMovieKey: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addRandomNowPlayingMovie: (state, action) => {
      state.randomNowPlayingMovie = action.payload;
    },
    addRandomMovieId: (state, action) => {
      state.randomMovieId = action.payload;
    },
    addRandomMovieKey: (state, action) => {
      state.randomMovieKey = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addRandomNowPlayingMovie,
  addRandomMovieId,
  addRandomMovieKey,
} = moviesSlice.actions;

export default moviesSlice.reducer;
