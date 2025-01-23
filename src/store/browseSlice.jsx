import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "browse",
  initialState: {
    nowPlayingMovies: null,
    randomNowPlayingMovie: null,
    randomMovieId: null,
    randomMovieKey: null,
    browseDropDown: "all",
    videoMuted: true,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addRandomNowPlayingMovie: (state, action) => {
      state.randomNowPlayingMovie = action.payload;
    },
    removeRandomNowPlayingMovie: (state, action) => {
      state.randomNowPlayingMovie = null;
    },
    addRandomMovieId: (state, action) => {
      state.randomMovieId = action.payload;
    },
    addRandomMovieKey: (state, action) => {
      state.randomMovieKey = action.payload;
    },
    removeRandomMovieKey: (state) => {
      state.randomMovieKey = null;
    },
    changeBrowseDropDown: (state, action) => {
      state.browseDropDown = action.payload;
    },
    toggleVideoMuted: (state) => {
      state.videoMuted = !state.videoMuted;
    },
  },
});

export const {
  addNowPlayingMovies,
  addRandomNowPlayingMovie,
  removeRandomNowPlayingMovie,
  addRandomMovieId,
  addRandomMovieKey,
  removeRandomMovieKey,
  changeBrowseDropDown,
  toggleVideoMuted
} = moviesSlice.actions;

export default moviesSlice.reducer;
