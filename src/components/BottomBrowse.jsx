;
import { Link } from "react-router-dom";

const BottomBrowse = () => {
  return (
    <div className="bg-[#181E24] grid grid-cols-5 w-full lg:hidden sticky z-[10000] pt-4 pb-6 bottom-0">
      
        <Link to={"/browse/trending"}>
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
          <i className="ri-fire-line "></i>
            <p>Trending</p>
          </div>
        </Link>
        <Link to={"/browse/popular"}>
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-bard-line "></i>
            <p>Popular</p>
          </div>
        </Link>
        <Link to={"/browse/movies"}>
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-movie-2-line"></i>
            <p>Movies</p>
          </div>
        </Link>
        <Link to={"/browse/tvshows"}>
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-tv-2-line "></i>
            <p>TvShows</p>
          </div>
        </Link>
        <Link to={"/browse/peoples"}>
          {" "}
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-team-line "></i>
            <p>People</p>
          </div>
        </Link>
      
    </div>
  );
};

export default BottomBrowse;
