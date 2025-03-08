import { createSlice } from "@reduxjs/toolkit";

const getInitialLanguage = () => {
  return localStorage.getItem("language") || "en";
};

const configSlice = createSlice({
  name: "config",
  initialState: {
    language: getInitialLanguage(),
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { changeLanguage } = configSlice.actions;
export default configSlice.reducer;
