import { Link, Outlet } from "react-router-dom";

import HeaderBrowse from "./HeaderBrowse";

const Browse = () => {
  return (
    <>
      <div className="main">
        <HeaderBrowse />

        <div className="flex justify-between">
          <div className="left  h-[90vh] bg-[#2A323C] flex flex-col justify-between items-start px-4 py-6">
            <ul className="text-xl text-white font-semibold flex flex-col gap-10 p-6 ">
              <Link to={"/browse/trending"}>
                <li className="hover:bg-gray-300 rounded-md px-6 py-2 w-full"><i className="ri-fire-fill mr-2"></i>Trending</li>
              </Link>
              <Link to={"/browse/popular"}>
                <li className="hover:bg-gray-300 rounded-md px-6 py-2 w-full"><i className="ri-bard-fill mr-2"></i>Popular</li>
              </Link>
              <Link to={"/browse/movies"}>
                <li className="hover:bg-gray-300 rounded-md px-6 py-2 w-full"><i className="ri-movie-2-fill mr-2"></i>Movies</li>
              </Link>
              <Link to={"/browse/tvshows"}>
                <li className="hover:bg-gray-300 rounded-md px-6 py-2 w-full"><i className="ri-tv-2-fill mr-2"></i>Tvshows</li>
              </Link>
              <Link to={"/browse/peoples"}>
                {" "}
                <li className="hover:bg-gray-300 rounded-md px-6 py-2 w-full"><i className="ri-team-fill mr-2"></i>Peoples</li>
              </Link>
            </ul>
          </div>
          <div className="right w-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
