import { useEffect } from "react";
import VerticalCards from "./VerticalCards";
import browseDataFetchAsync from "../store/actions/browseDataAsync";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailerKey from "../utils/hooks/useMovieVideo";
import VideoTrailer from "./VideoTrailer";
import { changeBrowseDropDown, toggleVideoMuted } from "../store/browseSlice";
import Dropdown from "../utils/hooks/usedropdown";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import lang from "../utils/languageConstants";

const BrowseContent = () => {
  const dispatch = useDispatch();

  const handleSelect = (selectedOption) => {
    dispatch(changeBrowseDropDown(selectedOption.toLowerCase()));
  };

  const browse = useSelector((store) => store?.browse);
  const category = useSelector((store) => store?.browse?.browseDropDown);
  const langKey = useSelector((store) => store.config.language);

  useMovieTrailerKey();

  const fetchMoviesData = () => {
    dispatch(browseDataFetchAsync());
  };
  const videoMutedStatus = useSelector((state) => state.browse.videoMuted);

  useEffect(() => {
    fetchMoviesData();
  }, [category]);

  if (!browse || !browse.randomNowPlayingMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative h-[55vh] w-full bg-gradient-to-r from-black">
        <div className="w-full h-full  -z-10 absolute">
          {/* {browse?.randomMovieKey !== null ? (
            <VideoTrailer trailerKey={browse?.randomMovieKey} />
          ) : (
            <img
              className="w-[100%] h-[100%] object-center -z-10 absolute"
              src={`https://image.tmdb.org/t/p/original/${
                browse?.randomNowPlayingMovie?.backdrop_path ||
                browse?.randomNowPlayingMovie?.profile_path ||
                browse?.randomNowPlayingMovie?.poster_path
              }`}
            />
          )} */}
          {browse?.randomMovieKey !== null && videoMutedStatus ? (
            <img
              className="w-[100%] h-[100%] object-center -z-10 absolute"
              src={`https://image.tmdb.org/t/p/original/${
                browse?.randomNowPlayingMovie?.backdrop_path ||
                browse?.randomNowPlayingMovie?.profile_path ||
                browse?.randomNowPlayingMovie?.poster_path
              }`}
            />
          ) : (
            <VideoTrailer trailerKey={browse?.randomMovieKey} />
          )}
        </div>
        <div className="h-full flex flex-col gap-3 justify-end  text-white  px-16 pb-12 w-[50vw]">
          <h1 className="text-4xl font-bold">
            {browse.randomNowPlayingMovie.title ||
              browse.randomNowPlayingMovie.original_title ||
              browse.randomNowPlayingMovie.name ||
              browse.randomNowPlayingMovie.original_name}
          </h1>
          <p className="text-md ">
            {browse.randomNowPlayingMovie.overview
              .split(" ")
              .slice(0, 30)
              .join(" ")}
            <Link
              to={`/${browse.randomNowPlayingMovie.media_type}/${browse.randomNowPlayingMovie.id}`}
              className="text-blue-600 cursor-pointer"
            >
              ...more
            </Link>
          </p>
          <div className="flex gap-4">
            <span>
              <i className="ri-megaphone-fill mr-1 text-yellow-500"></i>
              {browse.randomNowPlayingMovie.release_date ||
                browse.randomNowPlayingMovie.first_air_date}
            </span>
            <span>
              <i className="ri-movie-2-fill mr-1 text-yellow-500"></i>{" "}
              {browse.randomNowPlayingMovie.media_type.toUpperCase()}
            </span>
          </div>
          <div>
            <button
              onClick={() => dispatch(toggleVideoMuted())}
              className="bg-[#E50000] px-4 py-2 rounded-lg"
            >
              {videoMutedStatus ? "Play Trailer" : "Stop Trailer"}
            </button>
          </div>
        </div>
      </div>

      <div className=" px-12 pl-18 pt-3 bg-black ">
        <div className="flex flex-row justify-between items-center  mb-4  ">
          <div>
            {" "}
            <h1 className="text-2xl font-bold mb-4 text-white">
              {lang[langKey].trending}
            </h1>
          </div>
          <div className="flex gap-5">
            <Dropdown
              title="Filter"
              options={["Movie", "Tv", "All"]}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div>
          <VerticalCards data={browse?.nowPlayingMovies} title={category} />
        </div>
      </div>
    </div>
  );
};

export default BrowseContent;
