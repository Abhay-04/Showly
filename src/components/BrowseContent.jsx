import { useDispatch } from "react-redux";

import {
  addNowPlayingMovies,
  addRandomMovieId,
  addRandomNowPlayingMovie,
} from "../store/moviesSlice";
import { useEffect } from "react";
import axiosInstance from "../axiosConfig";
import useMovieTrailerKey from "../utils/hooks/useMovieVideo";

const BrowseContent = () => {
  const dispatch = useDispatch();
  useMovieTrailerKey();

  const fetchNowPlaying = async () => {
    try {
      const data = await axiosInstance.get(
        "/movie/now_playing?language=en-US&page=1"
      );

      const allNowPlayingmovies = dispatch(
        addNowPlayingMovies(data.data.results)
      );

      const randomLength =
        Math.floor(Math.random() * data.data.results.length) + 1;

      const randomNowPlayingMovie = dispatch(
        addRandomNowPlayingMovie(data.data.results[randomLength])
      );

      dispatch(addRandomMovieId(randomNowPlayingMovie.payload.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return <div>BrowseContent</div>;
};

export default BrowseContent;
