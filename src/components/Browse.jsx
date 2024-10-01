import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../src/logo.jpg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Browse = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName , photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName , photoURL: photoURL }));
        navigate("/browse");

        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
        
        // ...
      }
    });
  }, []);
  

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
       
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
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
                      : USER_AVATAR
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
