;
import { Link } from "react-router-dom";

const BottomBrowse = () => {
  return (
    <div className="bg-[#181E24]  w-full h-[5vh] px-4 py-8 lg:hidden absolute z-50 bottom-0 flex justify-evenly items-center gap-4">
      
        <Link to={"/browse/trending"}>
          <span className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-fire-fill mr-2"></i>
            <p>Trending</p>
          </span>
        </Link>
        <Link to={"/browse/popular"}>
          <span className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-bard-fill mr-2"></i>
            <p>Popular</p>
          </span>
        </Link>
        <Link to={"/browse/movies"}>
          <span className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-movie-2-fill mr-2"></i>
            <p>Movies</p>
          </span>
        </Link>
        <Link to={"/browse/tvshows"}>
          <span className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-tv-2-fill mr-2"></i>
            <p>TvShows</p>
          </span>
        </Link>
        <Link to={"/browse/peoples"}>
          {" "}
          <span className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-team-fill mr-2"></i>
            <p>Peoples</p>
          </span>
        </Link>
      
    </div>
  );
};

export default BottomBrowse;
