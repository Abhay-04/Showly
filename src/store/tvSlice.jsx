import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    data: [],
    category: "top_rated",
    page: 1,
  },
  reducers: {
    addTvData: (state, action) => {
      state.data = action.payload;
    },
    changeTvCategory: (state, action) => {
      state.category = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { addTvData , changeTvCategory , setPage } =
  tvSlice.actions;

export default tvSlice.reducer;
