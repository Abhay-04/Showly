import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./browseSlice";
import trendingReducer from "./trendingSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    browse: moviesReducer,
    trending: trendingReducer,
  },
});

export default appStore;
