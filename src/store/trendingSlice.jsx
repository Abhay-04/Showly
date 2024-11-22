import { createSlice } from "@reduxjs/toolkit";

const tredingSlice = createSlice({
  name: "trending",
  initialState: {
    data: [],
    category: "all",
    duration: "day",
    page: 1,
  },
  reducers: {
    addTrendingData: (state, action) => {
      state.data = action.payload;
    },
    changeTrendingCategory: (state, action) => {
      state.category = action.payload;
    },
    changeTrendingDuration: (state, action) => {
      state.duration = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const {
  addTrendingData,
  changeTrendingCategory,
  changeTrendingDuration,
  setPage
} = tredingSlice.actions;

export default tredingSlice.reducer;
