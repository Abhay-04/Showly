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

    removeSearchData: (state) => {
      state.data = [];
    },

    removeQueryData: (state) => {
      state.query = "";
    },

    
  },
});

export const { addSearchData, addQueryData , removeSearchData , removeQueryData  } = searchSlice.actions;

export default searchSlice.reducer;
