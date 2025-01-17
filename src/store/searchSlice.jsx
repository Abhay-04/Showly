import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "Search",
  initialState: {
    data: [],
    query: "",
    
  },
  reducers: {
    addSearchData: (state, action) => {
      state.data = action.payload;
    },
    addQueryData: (state, action) => {
      state.query = action.payload;
    },

    removeQueryData: (state) => {
      state.data = null;
    },

    
  },
});

export const { addSearchData, addQueryData , removeQueryData  } = searchSlice.actions;

export default searchSlice.reducer;
