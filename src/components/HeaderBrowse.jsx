import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { changeLanguage } from "../store/configSlice";
import SearchBar from "./SearchBar";

const HeaderBrowse = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);

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
        // navigate("/browse");

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

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      dropdownRef2.current &&
      !dropdownRef.current.contains(event.target) &&
      !dropdownRef2.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // const handleLanguageChange = (e) => {
  //   dispatch(changeLanguage(e.target.value));
  // };

  return (
    <div className="flex bg-black  justify-between h-[10vh] items-center lg:px-20   text-white ">
      <div>
        {/* <SearchBar /> */}
        <h1>SearchBAr</h1>
      </div>
      <div className="right-nav flex items-center gap-2 relative cursor-pointer">
        {/* <select onChange={handleLanguageChange} className="text-black">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.language}
            </option>
          ))}
        </select> */}

        <Link to={"/browse/gpt"}>
          <button className="mx-2 px-2 py-1 bg-[#E50000] cursor-pointer text-white rounded-md">
            GPT Search
          </button>
        </Link>

        <div
          onClick={handleToggleDropdown}
          ref={dropdownRef}
          className="flex items-center"
        >
          <img
            className="w-8 h-8 rounded-full mx-2"
            src={user?.photoURL ? user?.photoURL : USER_AVATAR}
            alt="User Avatar"
          />
          {/* <p className="mr-1 hidden sm:block">
            {user?.displayName ? user?.displayName : "Guest"}
          </p> */}
          <i className="ri-arrow-down-s-fill  "></i>
        </div>

        {/* Dropdown menu */}
        {showDropdown && (
          <div
            ref={dropdownRef2}
            className="absolute -bottom-48 right-0 mt-2 bg-transparent text-white font-semibold  rounded-md shadow-lg w-auto z-50"
          >
            <ul className="list-none bg-[#181E24] px-4 py-2 cursor-pointer rounded-lg  w-full h-auto   ">
              <li className="my-2 hover:bg-gray-300 hover:text-black rounded-md px-2 py-1">
                <i className="ri-user-3-fill mr-4"></i>
                Hi,{" "}
                {user?.displayName ? user?.displayName?.split(" ")[0] : "Guest"}
              </li>
              <li className="my-2 hover:bg-gray-300 hover:text-black rounded-md px-2 py-1">
                <i className="ri-sun-fill mr-4"></i>Light Mode
              </li>
              <Link to={"/browse/saved"}>
                {" "}
                <li className="my-2 hover:bg-gray-300 hover:text-black rounded-md px-2 py-1">
                  <i className="ri-bookmark-2-fill mr-4"></i>Saved
                </li>
              </Link>
              <li
                onClick={handleSignOut}
                className="my-2 hover:bg-gray-300 hover:text-black rounded-md px-2 py-1 "
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
