import { Link, Outlet } from "react-router-dom";

import HeaderBrowse from "./HeaderBrowse";

const Browse = () => {



  return (
    <>
      <div className="main">
         <HeaderBrowse />
         
        <div className="flex justify-between">
          <div className="left  h-[90vh] bg-emerald-200 flex flex-col justify-between items-start px-4 py-6">
            <ul>
              <div>
                
                <Link to={"/browse"}>
                  <li>Trending</li>
                </Link>
                <Link to={"/browse/popular"}>
                  <li>Popular</li>
                </Link>
                <Link to={"/browse/movies"}>
                  <li>Movies</li>
                </Link>
                <Link to={"/browse/tvshows"}>
                  <li>Tvshows</li>
                </Link>
                <Link to={"/browse/peoples"}>
                  {" "}
                  <li>Peoples</li>
                </Link>
              </div>
            </ul>
           
          </div>
          <div className="right w-full bg-red-300">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
