import axiosInstance from "../../axiosConfig";

import {
  addNowPlayingMovies,
  addRandomMovieId,
  addRandomNowPlayingMovie,
} from "../moviesSlice";

const browseDataFetchAsync = () => async (dispatch) => {
  try {
    const data = await axiosInstance.get(
      "/movie/now_playing?language=en-US&page=1"
    );
    
    console.log(data)
   

    const allNowPlayingmovies = await dispatch(
      addNowPlayingMovies(data?.data?.results)
    );


    console.log(allNowPlayingmovies);

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
