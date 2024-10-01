import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../src/logo.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

const Browse = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

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
            <div className="items-center">
              <div className="flex items-center">
                <img
                  className="size-8 rounded-full mx-3"
                  src={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://icons.veryicon.com/png/o/miscellaneous/youyinzhibo/guest.png"
                  }
                />
                <p>{user?.displayName ? user?.displayName : "Guest"}</p>
              </div>
              <div
                className="bg-red-500 text-center mt-2  px-6 py-2 rounded-md w-full text-white cursor-pointer "
                onClick={handleSignOut}
              >
                Logout
              </div>
            </div>
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
