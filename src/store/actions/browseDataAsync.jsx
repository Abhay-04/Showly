import axiosInstance from "../../axiosConfig";

import {
  addNowPlayingMovies,
  addRandomMovieId,
  addRandomNowPlayingMovie,
} from "../browseSlice";

const browseDataFetchAsync = () => async (dispatch, getState) => {
  
  const browse = getState();
  const category = browse.browse.browseDropDown;
  try {
    const data = await axiosInstance.get(`trending/${category}/day`);

    

    const allNowPlayingmovies = await dispatch(
      addNowPlayingMovies(data?.data?.results)
    );

    const randomLength = Math.floor(Math.random() * data?.data?.results.length);

    const randomNowPlayingMovie = await dispatch(
      addRandomNowPlayingMovie(data?.data?.results[randomLength])
    );

    await dispatch(addRandomMovieId(randomNowPlayingMovie?.payload?.id));
  } catch (error) {
    console.log(error);
  }
};

export default browseDataFetchAsync;
