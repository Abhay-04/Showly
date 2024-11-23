import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [],
    category: "upcoming",
    page: 1,
  },
  reducers: {
    addMoviesData: (state, action) => {
      state.data = action.payload;
    },
    changeMoviesCategory: (state, action) => {
      state.category = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { addMoviesData, changeMoviesCategory, setPage } =
  moviesSlice.actions;

export default moviesSlice.reducer;
