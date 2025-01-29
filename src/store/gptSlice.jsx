import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    prompt: null,
    gptResults: null,
    tmdbResults: null,
  },
  reducers: {
    addPromptData: (state, action) => {
      state.prompt = action.payload;
    },
    removePromptData: (state) => {
      state.prompt = "";
    },

    addGPTResultData: (state, action) => {
      state.gptResults = action.payload;
    },
    removeGPTResultData: (state) => {
      state.gptResults = {};
    },

    addTMDBResultData: (state, action) => {
      state.tmdbResults = action.payload;
    },
    removeTMDBResultData: (state) => {
      state.tmdbResults = null;
    },
  },
});

export const {
  addGPTResultData,
  removeGPTResultData,
  addPromptData,
  removePromptData,
  addTMDBResultData,
  removeTMDBResultData,
} = gptSlice.actions;

export default gptSlice.reducer;
