import { createSlice } from "@reduxjs/toolkit";

const popularSlice = createSlice({
  name: "popular",
  initialState: {
    data: [],
    category: "movie",
    page: 1,
  },
  reducers: {
    addPopularData: (state, action) => {
      state.data = action.payload;
    },
    changePopularCategory: (state, action) => {
      state.category = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { addPopularData, changePopularCategory, setPage } =
  popularSlice.actions;

export default popularSlice.reducer;
