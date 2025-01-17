import { useEffect } from "react";
import VerticalCards from "./VerticalCards";
import browseDataFetchAsync from "../store/actions/browseDataAsync";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailerKey from "../utils/hooks/useMovieVideo";
import VideoTrailer from "./VideoTrailer";
import { changeBrowseDropDown, toggleVideoMuted } from "../store/browseSlice";
import Dropdown from "../utils/hooks/usedropdown";
import { Link } from "react-router-dom";

import lang from "../utils/languageConstants";
import { NO_IMAGE_URL } from "../utils/constants";
import Loading from "./Loading";

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
    return <Loading />;
  }

  return (
    <div className="">
      <div className="relative h-[60vh] sm:h-[55vh] w-full bg-gradient-to-r from-black  ">
        <div className="w-[100%] h-full  -z-10 absolute ">
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
              src={
                browse?.randomNowPlayingMovie?.backdrop_path ||
                browse?.randomNowPlayingMovie?.profile_path ||
                browse?.randomNowPlayingMovie?.poster_path !== null
                  ? `https://image.tmdb.org/t/p/original/${
                      browse?.randomNowPlayingMovie?.backdrop_path ||
                      browse?.randomNowPlayingMovie?.profile_path ||
                      browse?.randomNowPlayingMovie?.poster_path
                    }`
                  : NO_IMAGE_URL
              }
            />
          ) : (
            <VideoTrailer trailerKey={browse?.randomMovieKey} />
          )}
        </div>
        <div className="h-full flex flex-col gap-3 justify-end  text-white p-6  sm:px-16 pb-12 sm:w-[50vw] ">
          <h1 className=" text-2xl sm:text-4xl font-bold">
            {browse.randomNowPlayingMovie.title ||
              browse.randomNowPlayingMovie.original_title ||
              browse.randomNowPlayingMovie.name ||
              browse.randomNowPlayingMovie.original_name}
          </h1>
          <p className=" text-sm sm:text-lg ">
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

      <div className=" px-6 sm:px-12 pl-18 pt-20 sm:pt-8 bg-black sm:h-[70vh] flex flex-col justify-center  ">
        <div className="flex flex-row justify-between   mb-4  ">
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
        <div className="">
          <VerticalCards data={browse?.nowPlayingMovies} title={category} />
        </div>
      </div>
    </div>
  );
};

export default BrowseContent;
