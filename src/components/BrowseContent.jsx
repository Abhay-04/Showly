import { useEffect } from "react";
import VerticalCards from "./VerticalCards";
import browseDataFetchAsync from "../store/actions/browseDataAsync";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailerKey from "../utils/hooks/useMovieVideo";
import VideoTrailer from "./VideoTrailer";
import { changeBrowseDropDown } from "../store/browseSlice";
import Dropdown from "../utils/hooks/usedropdown";

const BrowseContent = () => {
  const dispatch = useDispatch();

  const handleSelect = (selectedOption) => {
    dispatch(changeBrowseDropDown(selectedOption.toLowerCase()));
  };

  const browse = useSelector((store) => store?.browse);
  const category = useSelector((store) => store?.browse?.browseDropDown);

  useMovieTrailerKey();


  const fetchMoviesData = () => {
    dispatch(browseDataFetchAsync());
  };

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
          <VideoTrailer trailerKey={browse?.randomMovieKey} />
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
            <span className="text-blue-600 cursor-pointer">...more</span>
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
            <Dropdown
              
              title="Filter"
              options={["Movie", "Tv", "All"]}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <div>
          <VerticalCards data={browse?.nowPlayingMovies} />
        </div>
      </div>
    </div>
  );
};

export default BrowseContent;

