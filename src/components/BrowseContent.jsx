import { useEffect } from "react";
import VerticalCards from "./VerticalCards";
import browseDataFetchAsync from "../store/actions/browseDataAsync";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailerKey from "../utils/hooks/useMovieVideo";
import VideoTrailer from "./VideoTrailer";
import { changeBrowseDropDown } from "../store/moviesSlice";

const BrowseContent = () => {
  const movies = useSelector((store) => store?.movies);
  const category = useSelector((store) => store?.movies?.browseDropDown);

  useMovieTrailerKey();

  const dispatch = useDispatch();

  const fetchMoviesData = () => {
    dispatch(browseDataFetchAsync());
  };

  useEffect(() => {
    fetchMoviesData();
  }, [category]);

  if (!movies || !movies.randomNowPlayingMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative h-[55vh] w-full bg-gradient-to-r from-black">
        <div className="w-full h-full  -z-10 absolute">
          <VideoTrailer trailerKey={movies?.randomMovieKey} />
        </div>
        <div className="h-full flex flex-col gap-3 justify-end  text-white  px-16 pb-12 w-[50vw]">
          <h1 className="text-4xl font-bold">
            {movies.randomNowPlayingMovie.title ||
              movies.randomNowPlayingMovie.original_title ||
              movies.randomNowPlayingMovie.name ||
              movies.randomNowPlayingMovie.original_name}
          </h1>
          <p className="text-md ">
            {movies.randomNowPlayingMovie.overview
              .split(" ")
              .slice(0, 30)
              .join(" ")}
            <span className="text-blue-600 cursor-pointer">...more</span>
          </p>
          <div className="flex gap-4">
            <span>
              <i className="ri-megaphone-fill mr-1 text-yellow-500"></i>
              {movies.randomNowPlayingMovie.release_date ||
                movies.randomNowPlayingMovie.first_air_date}
            </span>
            <span>
              <i className="ri-movie-2-fill mr-1 text-yellow-500"></i>{" "}
              {movies.randomNowPlayingMovie.media_type.toUpperCase()}
            </span>
          </div>
          <div>
            <button className="bg-[#9333EA] px-4 py-2 rounded-lg ">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      <div className=" px-12 pl-18 pt-3 bg-black ">
        <div className="flex flex-row justify-between items-center w-[83vw] mb-4  ">
          <div>
            {" "}
            <h1 className="text-2xl font-bold mb-4 text-white">Trending</h1>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => {
                dispatch(changeBrowseDropDown("all"));
              }}
              className="px-4 py-2 bg-purple-400 text-white rounded-md"
            >
              All
            </button>
            <button
              onClick={() => {
                dispatch(changeBrowseDropDown("movie"));
              }}
              className="px-4 py-2 bg-purple-400 text-white rounded-md"
            >
              Movie
            </button>
            <button
              onClick={() => {
                dispatch(changeBrowseDropDown("tv"));
              }}
              className="px-4 py-2 bg-purple-400 text-white rounded-md"
            >
              Tv
            </button>
          </div>
        </div>
        <div>
          <VerticalCards data={movies?.nowPlayingMovies} />
        </div>
      </div>
    </div>
  );
};

export default BrowseContent;

// useMovieTrailerKey();
// const dispatch = useDispatch();

// const trailerKey = useSelector((store) => store.movies.randomMovieKey);
// const randomNowPlayingMovie = useSelector(
//   (store) => store.movies.randomNowPlayingMovie
// );

// const nowPlayingMovies = useSelector(
//   (store) => store.movies.nowPlayingMovies
// );

// const fetchNowPlaying = async () => {
//   try {
//     const data = await axiosInstance.get(
//       "/movie/now_playing?language=en-US&page=1"
//     );

//     const allNowPlayingmovies = dispatch(
//       addNowPlayingMovies(data?.data?.results)
//     );

//     console.log(allNowPlayingmovies);

//     const randomLength = Math.floor(
//       Math.random() * data?.data?.results.length
//     );

//     const randomNowPlayingMovie = dispatch(
//       addRandomNowPlayingMovie(data?.data?.results[randomLength])
//     );

//     dispatch(addRandomMovieId(randomNowPlayingMovie?.payload?.id));
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//  fetchNowPlaying();
// }, []);
