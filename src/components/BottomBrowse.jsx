;
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import lang from "../utils/languageConstants";

const BottomBrowse = () => {

  const langKey = useSelector((store) => store.config.language);
  return (
    <div className="bg-[#181E24] grid grid-cols-5 w-full lg:hidden sticky z-[10000] pt-4 pb-6 bottom-0">
      
        <Link to={"/browse/trending"}>
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
          <i className="ri-fire-line "></i>
          {lang[langKey].trending}
          </div>
        </Link>
        <Link to={"/browse/popular"}>
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-bard-line "></i>
            {lang[langKey].popular}
          </div>
        </Link>
        <Link to={"/browse/movies"}>
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-movie-2-line"></i>
            {lang[langKey].movies}
          </div>
        </Link>
        <Link to={"/browse/tvshows"}>
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-tv-2-line "></i>
            {lang[langKey].tvShows}
          </div>
        </Link>
        <Link to={"/browse/peoples"}>
          {" "}
          <div className="text-white text-xs font-bold flex flex-col items-center justify-center">
            <i className="ri-team-line "></i>
            {lang[langKey].people}
          </div>
        </Link>
      
    </div>
  );
};

export default BottomBrowse;
