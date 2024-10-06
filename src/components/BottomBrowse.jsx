;
import { Link } from "react-router-dom";

const BottomBrowse = () => {
  return (
    <div className="bg-[#181E24] text-white text-xl font-bold w-full h-[5vh] px-4 py-8 lg:hidden absolute z-50 bottom-0 flex justify-evenly items-center gap-4">
      
        <Link to={"/browse/trending"}>
          <span className="">
            <i className="ri-fire-fill mr-2"></i>
          </span>
        </Link>
        <Link to={"/browse/popular"}>
          <span className="">
            <i className="ri-bard-fill mr-2"></i>
          </span>
        </Link>
        <Link to={"/browse/movies"}>
          <span className="">
            <i className="ri-movie-2-fill mr-2"></i>
          </span>
        </Link>
        <Link to={"/browse/tvshows"}>
          <span className="">
            <i className="ri-tv-2-fill mr-2"></i>
          </span>
        </Link>
        <Link to={"/browse/peoples"}>
          {" "}
          <span className="">
            <i className="ri-team-fill mr-2"></i>
          </span>
        </Link>
      
    </div>
  );
};

export default BottomBrowse;
