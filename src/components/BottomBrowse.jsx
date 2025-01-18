;
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import lang from "../utils/languageConstants";

const BottomBrowse = () => {

  const langKey = useSelector((store) => store.config.language);

 const location  = useLocation()
  
  return (
    <div className="bg-[#181E24] grid grid-cols-6 w-full lg:hidden h-auto fixed z-[10000] py-3  bottom-0">
      
        <Link to={"/browse"}>
          <div className={`text-white text-xs font-bold flex flex-col items-center justify-center rounded-lg ${
          location.pathname === "/browse" ? "bg-[#E50000]" : ""
        }`}>
          <i className="ri-home-line"></i>
          {"Home"}
          </div>
        </Link>
        <Link to={"/browse/trending"}>
          <div className={`text-white text-xs font-bold flex flex-col items-center justify-center rounded-lg ${
          location.pathname === "/browse/trending" ? "bg-[#E50000]" : ""
        }`}>
          <i className="ri-fire-line "></i>
          {lang[langKey].trending}
          </div>
        </Link>
        <Link to={"/browse/popular"}>
          <div className={`text-white text-xs font-bold flex flex-col items-center justify-center rounded-lg ${
          location.pathname === "/browse/popular" ? "bg-[#E50000]" : ""
        }`}>
            <i className="ri-bard-line "></i>
            {lang[langKey].popular}
          </div>
        </Link>
        <Link to={"/browse/movies"}>
          <div className={`text-white text-xs font-bold flex flex-col items-center justify-center rounded-lg ${
          location.pathname === "/browse/movies" ? "bg-[#E50000]" : ""
        }`}>
            <i className="ri-movie-2-line"></i>
            {lang[langKey].movies}
          </div>
        </Link>
        <Link to={"/browse/tvshows"}>
          <div className={`text-white text-xs font-bold flex flex-col items-center justify-center rounded-lg ${
          location.pathname === "/browse/tvshows" ? "bg-[#E50000]" : ""
        }`}>
            <i className="ri-tv-2-line "></i>
            {lang[langKey].tvShows}
          </div>
        </Link>
        <Link to={"/browse/peoples"}>
          {" "}
          <div className={`text-white text-xs font-bold flex flex-col items-center justify-center rounded-lg ${
          location.pathname === "/browse/peoples" ? "bg-[#E50000]" : ""
        }`}>
            <i className="ri-team-line "></i>
            {lang[langKey].people}
          </div>
        </Link>
      
    </div>
  );
};

export default BottomBrowse;
