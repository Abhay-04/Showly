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

import Loading from "./Loading";

const BrowseContent = () => {
  const dispatch = useDispatch();

  const handleSelect = (selectedOption) => {
    dispatch(changeBrowseDropDown(selectedOption.toLowerCase()));
    dispatch(browseDataFetchAsync());
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
  }, []);

  if (!browse || !browse.randomNowPlayingMovie) {
    return <Loading />;
  }

  return (
    <div className="">
      <div

        
        className={`relative h-[60vh] ${
          !videoMutedStatus ? "2xl:h-[85vh]" : "sm:h-[55vh]"
        } aspect-video w-full  ${
          videoMutedStatus && "bg-gradient-to-r from-black"
        }`}
      >
        <Link to={`/${browse.randomNowPlayingMovie.media_type}/${browse.randomNowPlayingMovie.id}`}>
          <div className="w-[100%] h-full   absolute ">
            <div className="relative w-full h-full rounded-xl">
              {/* Background Image */}
              <img
                className="w-full h-full  sm:object-right-top sm:object-cover object-cover object-center  -z-10 absolute"
                src={
                  browse?.randomNowPlayingMovie.backdrop_path ||
                  browse?.randomNowPlayingMovie.poster_path
                    ? `https://image.tmdb.org/t/p/original/${
                        browse?.randomNowPlayingMovie?.backdrop_path ||
                        browse?.randomNowPlayingMovie?.poster_path
                      }`
                    : "https://image.tmdb.org/t/p/original//9iwmsNVjbex9qa7FhqDUh92EjdQ.jpg"
                }
                alt="Background Movie"
              />

              {/* Conditional Video */}
              {browse?.randomMovieKey !== null && !videoMutedStatus && (
                <VideoTrailer trailerKey={browse?.randomMovieKey} />
              )}
            </div>
          </div>
        </Link>
        <div className="h-full flex flex-col gap-3 justify-end  text-white p-4  sm:px-16 pb-6 sm:w-[50vw] ">
          {videoMutedStatus && (
            <h1 className=" text-2xl sm:text-4xl font-bold">
              {browse.randomNowPlayingMovie.title ||
                browse.randomNowPlayingMovie.original_title ||
                browse.randomNowPlayingMovie.name ||
                browse.randomNowPlayingMovie.original_name}
            </h1>
          )}
          {videoMutedStatus && (
            <p className=" text-sm sm:text-lg ">
              {browse.randomNowPlayingMovie.overview
                .split(" ")
                .slice(0, 30)
                .join(" ")}
              <Link
                to={`/${browse.randomNowPlayingMovie.media_type}/${browse.randomNowPlayingMovie.id}`}
                className="text-blue-600 cursor-pointer"
              >
                { browse?.randomNowPlayingMovie?.overview && "...more"}
              </Link>
            </p>
          )}
          {videoMutedStatus && (
            <div className="flex gap-4">
              <span>
                <i className="ri-megaphone-fill mr-1 text-yellow-500"></i>
                {browse.randomNowPlayingMovie.release_date ||
                browse.randomNowPlayingMovie.first_air_date
                  ? new Date(
                      browse.randomNowPlayingMovie.release_date ||
                        browse.randomNowPlayingMovie.first_air_date
                    ).toLocaleDateString("en-US", {
                      month: "short", // Short form for months (e.g., Jan, Feb, Mar)
                      day: "2-digit", // Two-digit day (e.g., 23)
                      year: "numeric", // Full year (e.g., 2024)
                    })
                  : "N/A"}
              </span>

              <span>
                <i className="ri-movie-2-fill mr-1 text-yellow-500"></i>{" "}
                {browse.randomNowPlayingMovie.media_type.toUpperCase()}
              </span>
            </div>
          )}
          <div className="z-[100]">
            {browse?.randomMovieKey !== null ? (
              <button
                onClick={() => dispatch(toggleVideoMuted())}
                className={` ${
                  videoMutedStatus ? "bg-[#E50000]" : "bg-[#e5000048]"
                } hover:bg-[#E50000] px-4 py-2 rounded-lg`}
              >
                {videoMutedStatus ? (
                  <i className="ri-play-large-line"></i>
                ) : (
                  <i className="ri-pause-large-fill"></i>
                )}{" "}
                {videoMutedStatus
                  ? `${lang[langKey].playTrailer} `
                  : `${lang[langKey].stopTrailer}`}
              </button>
            ) : (
              <button className="bg-[#E50000] px-4 py-2 rounded-lg">
                {" "}
                <i className="ri-error-warning-line"></i>{" "}
                {lang[langKey].trailerNA}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className=" px-6 pb-10 sm:px-12 pt-16 sm:pt-20 bg-black h-[100vh] md:h-[75vh] lg:h-[100vh] 2xl:h-[90vh] flex flex-col sm:justify-center  ">
        <div className="flex flex-row justify-between   mb-4  ">
          <div>
            {" "}
            <h1 className="text-2xl font-bold mb-4 text-white">
              {lang[langKey].trending}
            </h1>
          </div>
          <div className="flex gap-5">
            <Dropdown
              title={lang[langKey].filter}
              options={["Movie", "Tv", "All"]}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div className="pb-40 lg:pb-30">
          <VerticalCards data={browse?.nowPlayingMovies}  />
        </div>
      </div>
    </div>
  );
};

export default BrowseContent;
