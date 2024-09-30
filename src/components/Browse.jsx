import { Link, Outlet } from "react-router-dom";
import Logo from "../../src/logo.jpg";

const Browse = () => {
  return (
    <>
      <div className="main">
        <div className="flex justify-between">
          <div className="left  h-screen bg-emerald-200 flex flex-col justify-between items-start px-4 py-6">
            <ul>
              <div>
              <div className="logo w-40 sm:w-60 lg:w-64 mix-blend-hard-light sm:mix-blend-lighten mb-6  ">
                <img src={Logo} />
              </div>
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
            <div>Logout</div>
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
