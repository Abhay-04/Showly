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
  const randomNowPlayingMovie = useSelector(
    (store) => store.movies.randomNowPlayingMovie
  );

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
      <div className="relative h-[55vh] w-full bg-gradient-to-r from-black">
        <VideoTrailer trailerKey={trailerKey} />
        <div className="h-full flex flex-col justify-end  text-white  px-16 pb-12 w-[50vw]">
          <h1 className="text-3xl font-bold">{randomNowPlayingMovie.title}</h1>
          <p className="text-lg ">{randomNowPlayingMovie.overview}</p>
          <div className="flex gap-4">
            <span>
              <i className="ri-megaphone-fill mr-2 text-yellow-500"></i>
              {randomNowPlayingMovie.release_date}
            </span>
            <span><i className="ri-movie-2-fill mr-2 text-yellow-500"></i> Movie</span>
          </div>
        </div>
      </div>
    )
  );
};

export default BrowseContent;
