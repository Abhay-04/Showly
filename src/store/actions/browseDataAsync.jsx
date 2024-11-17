import axiosInstance from "../../axiosConfig";

import {
  addNowPlayingMovies,
  addRandomMovieId,
  addRandomNowPlayingMovie,
} from "../moviesSlice";

const browseDataFetchAsync = () => async (dispatch, getState) => {
  console.log(dispatch);
  const movie = getState();
 const category = movie.movies.browseDropDown
  try {
    const data = await axiosInstance.get(`trending/${category}/day`);

    console.log(data);

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
