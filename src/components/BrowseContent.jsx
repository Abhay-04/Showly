import { useEffect } from "react";
import VerticalCards from "./VerticalCards";
import browseDataFetchAsync from "../store/actions/browseDataAsync";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailerKey from "../utils/hooks/useMovieVideo";
import VideoTrailer from "./VideoTrailer";

const BrowseContent = () => {
  const movies = useSelector((store) => store?.movies);
  console.log(movies);

  useMovieTrailerKey();

  const dispatch = useDispatch();

  const fetchMoviesData = () => {
    dispatch(browseDataFetchAsync());
  };

  useEffect(() => {
    fetchMoviesData();
  }, []);


  if (!movies || !movies.randomNowPlayingMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative h-[55vh] w-full bg-gradient-to-r from-black">
        <div className="w-full h-full  -z-10 absolute">
            
          <VideoTrailer  trailerKey={movies?.randomMovieKey}   />
          </div>
        <div className="h-full flex flex-col gap-3 justify-end  text-white  px-16 pb-12 w-[50vw]">
          <h1 className="text-4xl font-bold">
            {movies.randomNowPlayingMovie.title ||
              movies.randomNowPlayingMovie.original_title}
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
              {movies.randomNowPlayingMovie.release_date}
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

      <div className="px-5 pt-3 bg-red-300">
        <h1 className="text-2xl font-bold mb-4">Now Playing</h1>
        <VerticalCards data={movies?.nowPlayingMovies} />
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
