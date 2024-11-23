import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import browseReducer from "./browseSlice";
import trendingReducer from "./trendingSlice";
import popularReducer from "./popularSlice";
import moviesReducer from "./moviesSlice";
import tvReducer from "./tvSlice";
import personReducer from "./personSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    browse: browseReducer,
    trending: trendingReducer,
    popular: popularReducer,
    movies: moviesReducer,
    tv: tvReducer,
    person: personReducer,
  },
});

export default appStore;
