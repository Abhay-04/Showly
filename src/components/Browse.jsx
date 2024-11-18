import { Link, Outlet } from "react-router-dom";

import HeaderBrowse from "./HeaderBrowse";

import BottomBrowse from "./BottomBrowse";

const Browse = () => {
  return (
    <>
      <div className="main overflow-hidden">
        <HeaderBrowse />

        <div className="lg:flex-row flex  flex-col-reverse  justify-between">
          <div className="left   sm:h-[90vh] bg-[#2A323C] lg:flex hidden flex-col justify-between items-start px-4 py-6">
            <ul className="text-xl text-white font-semibold flex flex-col gap-10 py-6 px-4 ">
              <Link to={"/browse/trending"}>
                <li className="hover:bg-purple-400 rounded-md px-6 py-2 w-full">
                  <i className="ri-fire-fill mr-2"></i>Trending
                </li>
              </Link>
              <Link to={"/browse/popular"}>
                <li className="hover:bg-purple-400 rounded-md px-6 py-2 w-full">
                  <i className="ri-bard-fill mr-2"></i>Popular
                </li>
              </Link>
              <Link to={"/browse/movies"}>
                <li className="hover:bg-purple-400 rounded-md px-6 py-2 w-full">
                  <i className="ri-movie-2-fill mr-2"></i>Movies
                </li>
              </Link>
              <Link to={"/browse/tvshows"}>
                <li className="hover:bg-purple-400 rounded-md px-6 py-2 w-full">
                  <i className="ri-tv-2-fill mr-2"></i>Tvshows
                </li>
              </Link>
              <Link to={"/browse/peoples"}>
                {" "}
                <li className="hover:bg-purple-400 rounded-md px-6 py-2 w-full">
                  <i className="ri-team-fill mr-2"></i>Peoples
                </li>
              </Link>
            </ul>
          </div>

          <div className="right w-full ">
            <Outlet />
          </div>
        </div>

        <BottomBrowse />
      </div>
    </>
  );
};

export default Browse;
