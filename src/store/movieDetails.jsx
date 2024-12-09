import { createSlice } from "@reduxjs/toolkit";

const movieDetails = createSlice({
  name: "movieDetails",
  initialState: {
    data: [],
    category: "upcoming",
    page: 1,
  },
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
    },
    removeData: (state) => {
      state.data = [];
    },
  },
});

export const { addData, removeData } = movieDetails.actions;

export default movieDetails.reducer;
