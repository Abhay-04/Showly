import { useDispatch, useSelector } from "react-redux";

import {
  addNowPlayingMovies,
  addRandomMovieId,
  addRandomNowPlayingMovie,
} from "../store/moviesSlice";
import { useEffect } from "react";
import axiosInstance from "../axiosConfig";
import useMovieTrailerKey from "../utils/hooks/useMovieVideo";
import VideoTrailer from "./VideoTrailer";

const BrowseContent = () => {
  useMovieTrailerKey();
  const dispatch = useDispatch();

  const trailerKey = useSelector((store) => store.movies.randomMovieKey);

  const backdrop_path = useSelector(
    (store) => store?.movies?.randomNowPlayingMovie?.backdrop_path
  );

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

  return (
    trailerKey && (
      <VideoTrailer trailerKey={trailerKey} />
    )
  );
};

export default BrowseContent;
