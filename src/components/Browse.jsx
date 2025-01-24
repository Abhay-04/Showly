import { Link, Outlet, useLocation } from "react-router-dom";

import HeaderBrowse from "./HeaderBrowse";

import BottomBrowse from "./BottomBrowse";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import Logo from "../../src/file.png";

const Browse = () => {
  const langKey = useSelector((store) => store.config.language);
  const location  = useLocation()
  return (
    <div className="main grid grid-cols-12 w-full h-[100vh] overflow-y-hidden">
  {/* Left Sidebar */}
  <div className="left sm:col-span-2 bg-black  hidden lg:block py-10">
    <ul className="text-xl text-white font-semibold flex flex-col gap-10 pb-6 px-4">
      <Link to={"/browse"}>
        <div className="logo">
          <img className="w-28 lg:w-40 ml-3  h-auto" src={Logo} alt="Logo" />
        </div>
      </Link>
      <Link to={"/browse"}>
        <li className={`hover:bg-[#E50000] ${
          location.pathname === "/browse" ? "bg-[#E50000]" : ""
        } rounded-md px-6 py-2`}>
          <i className="ri-home-2-fill mr-2"></i>
          {lang[langKey].home}
        </li>
      </Link>
      <Link to={"/browse/trending"}>
        <li className={`hover:bg-[#E50000] ${
          location.pathname === "/browse/trending" ? "bg-[#E50000]" : ""
        } rounded-md px-6 py-2`}>
          <i className="ri-fire-fill mr-2"></i>
          {lang[langKey].trending}
        </li>
      </Link>
      <Link to={"/browse/popular"}>
        <li className={`hover:bg-[#E50000] ${
          location.pathname === "/browse/popular" ? "bg-[#E50000]" : ""
        } rounded-md px-6 py-2`}>
          <i className="ri-bard-fill mr-2"></i>
          {lang[langKey].popular}
        </li>
      </Link>
      <Link to={"/browse/movies"}>
        <li className={`hover:bg-[#E50000] ${
          location.pathname === "/browse/movies" ? "bg-[#E50000]" : ""
        } rounded-md px-6 py-2`}>
          <i className="ri-movie-2-fill mr-2"></i>
          {lang[langKey].movies}
        </li>
      </Link>
      <Link to={"/browse/tvshows"}>
        <li className={`hover:bg-[#E50000] ${
          location.pathname === "/browse/tvshows" ? "bg-[#E50000]" : ""
        } rounded-md px-6 py-2`}>
          <i className="ri-tv-2-fill mr-2"></i>
          {lang[langKey].tvShows}
        </li>
      </Link>
      <Link to={"/browse/peoples"}>
        <li className={`hover:bg-[#E50000] ${
          location.pathname === "/browse/peoples" ? "bg-[#E50000]" : ""
        } rounded-md px-6 py-2`}>
          <i className="ri-team-fill mr-2"></i>
          {lang[langKey].people}
        </li>
      </Link>
    </ul>
  </div>

  {/* Right Content */}
  <div className="right lg:col-span-10 col-span-12">
    <HeaderBrowse />
    {/* Infinite Scroll Target */}
    <div id="scrollableDiv" className="h-screen overflow-y-scroll">
      <Outlet />
    </div>
    <BottomBrowse />
  </div>
</div>


  );
};

export default Browse;
