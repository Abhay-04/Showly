
import Logo from "../../src/logo.jpg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { USER_AVATAR } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

const HeaderBrowse = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
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

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="flex   justify-between h-[10vh] items-center lg:px-12 px-4 bg-[#1D232A] text-white border-b-2 border-[#505760]">
      <div className="logo">
        <img className=" w-28 lg:w-36 h-auto" src={Logo} alt="Logo" />
      </div>
      <div className="right-nav flex items-center gap-2 relative">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mx-2"
            src={user?.photoURL ? user?.photoURL : USER_AVATAR}
            alt="User Avatar"
          />
          <p className="mr-1 hidden sm:block">
            {user?.displayName ? user?.displayName : "Guest"}
          </p>
          <i
            className="ri-arrow-down-s-fill cursor-pointer"
            onClick={handleToggleDropdown}
          ></i>
        </div>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute -bottom-48 right-0 mt-2 bg-transparent text-white font-semibold  rounded-md shadow-lg">
            <ul className="list-none bg-[#181E24] px-4 py-2 cursor-pointer rounded-lg  w-40 h-auto  ">
              <li className="my-2 hover:bg-gray-300 rounded-md px-2 py-1">
                <i className="ri-user-3-fill mr-4"></i>
                Profile
              </li>
              <li className="my-2 hover:bg-gray-300 rounded-md px-2 py-1">
                <i className="ri-settings-3-fill mr-4"></i>Settings
              </li>
             <Link to={"/browse/saved"}> <li className="my-2 hover:bg-gray-300 rounded-md px-2 py-1">
                <i className="ri-bookmark-2-fill mr-4"></i>Saved
              </li></Link>
              <li
                onClick={handleSignOut}
                className="my-2 hover:bg-gray-300 rounded-md px-2 py-1 "
              >
                <i className="ri-logout-box-r-line mr-4"></i>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBrowse;
