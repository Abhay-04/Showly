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
    addRandomMovieId: (state, action) => {
      state.randomMovieId = action.payload;
    },
    addRandomMovieKey: (state, action) => {
      state.randomMovieKey = action.payload;
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
  addRandomMovieId,
  addRandomMovieKey,
  changeBrowseDropDown,
  toggleVideoMuted
} = moviesSlice.actions;

export default moviesSlice.reducer;
