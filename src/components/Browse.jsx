import { Link, Outlet } from "react-router-dom";
import Header from "./Header";

const Browse = () => {
  return (
    <>
      <div className="main">
        <Header />
        <div className="flex justify-around">
          <div>
            <ul>
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
            </ul>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Browse;
