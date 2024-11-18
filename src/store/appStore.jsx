import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./browseSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    browse: moviesReducer,
  },
});

export default appStore;
