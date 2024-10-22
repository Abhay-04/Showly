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
import VerticalCards from "./VerticalCards";

const BrowseContent = () => {
  useMovieTrailerKey();
  const dispatch = useDispatch();

  const trailerKey = useSelector((store) => store.movies.randomMovieKey);
  const randomNowPlayingMovie = useSelector(
    (store) => store.movies.randomNowPlayingMovie
  );

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const fetchNowPlaying = async () => {
    try {
      const data = await axiosInstance.get(
        "/movie/now_playing?language=en-US&page=1"
      );

      const allNowPlayingmovies = dispatch(
        addNowPlayingMovies(data?.data?.results)
      );

      console.log(allNowPlayingmovies);

      const randomLength = Math.floor(
        Math.random() * data?.data?.results.length
      );

      const randomNowPlayingMovie = dispatch(
        addRandomNowPlayingMovie(data?.data?.results[randomLength])
      );

      dispatch(addRandomMovieId(randomNowPlayingMovie?.payload?.id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return (
    trailerKey && (
      <div className="">
        <div className="relative h-[55vh] w-full bg-gradient-to-r from-black">
          <div className="w-full h-full  -z-10 absolute">
            <VideoTrailer trailerKey={trailerKey} />
          </div>
          <div className="h-full flex flex-col gap-3 justify-end  text-white  px-16 pb-12 w-[50vw]">
            <h1 className="text-4xl font-bold">
              {randomNowPlayingMovie.title ||
                randomNowPlayingMovie.original_title}
            </h1>
            <p className="text-md ">
              {randomNowPlayingMovie.overview.split(" ").slice(0, 30).join(" ")}
              <span className="text-blue-600 cursor-pointer">...more</span>
            </p>
            <div className="flex gap-4">
              <span>
                <i className="ri-megaphone-fill mr-1 text-yellow-500"></i>
                {randomNowPlayingMovie.release_date}
              </span>
              <span>
                <i className="ri-movie-2-fill mr-1 text-yellow-500"></i> Movie
              </span>
            </div>
            <div>
              <button className="bg-[#9333EA] px-4 py-2 rounded-lg ">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        <div>
         
          <VerticalCards />
        </div>
      </div>
    )
  );
};

export default BrowseContent;
