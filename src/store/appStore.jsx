import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import browseReducer from "./browseSlice";
import trendingReducer from "./trendingSlice";
import popularReducer from "./popularSlice";
import moviesReducer from "./moviesSlice";
import tvReducer from "./tvSlice";
import personReducer from "./personSlice";
import moviesDetailsReducer from "./movieDetailsSlice";
import tvDetailsReducer from "./tvDetailsSlice";
import personDetailsReducer from "./personDetailsSlice";
import searchDataReducer from "./searchSlice";

import configReducer from "./configSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
    searchData: searchDataReducer,
    browse: browseReducer,
    trending: trendingReducer,
    popular: popularReducer,
    movies: moviesReducer,
    tv: tvReducer,
    person: personReducer,
    movieDetails: moviesDetailsReducer,
    tvDetails: tvDetailsReducer,
    personDetails: personDetailsReducer,
  },
});

export default appStore;
