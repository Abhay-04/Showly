import { createSlice } from "@reduxjs/toolkit";

const personSlice = createSlice({
  name: "person",
  initialState: {
    data: [],

    page: 1,
  },
  reducers: {
    addPersonData: (state, action) => {
      state.data = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { addPersonData, setPage } = personSlice.actions;

export default personSlice.reducer;
