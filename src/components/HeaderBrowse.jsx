import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeLanguage } from "../store/configSlice";
import SearchBar from "./SearchBar";
import Logo from "../../src/file.png";
import lang from "../utils/languageConstants";

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
  const langKey = useSelector((store) => store.config.language);

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

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const location = useLocation();

  // Check if the route starts with `/browse/`
  const isBrowseRoute = location.pathname.startsWith("/browse");

  return (
    <div className="grid grid-cols-12 px-3 pt-5 sm:pb-6 pb-6 sm:py-12 bg-black lg:px-20 gap-4  text-white ">
      <div
        className={`logo col-span-5 order-1  ${
          isBrowseRoute ? "lg:col-span-6" : "lg:col-span-3"
        } ${isBrowseRoute ? "lg:hidden" : "block"} `}
      >
        <Link to={"/browse"}>
          <img className="w-32 lg:w-36 h-auto" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div
        className={`left  col-span-12 order-3 lg:order-2  ${
          isBrowseRoute ? "lg:col-span-7" : "lg:col-span-6"
        }`}
      >
        <SearchBar />
      </div>
      <div
        className={`right col-span-7 order-2 lg:order-3 ${
          isBrowseRoute ? "lg:col-span-5" : "lg:col-span-3"
        } flex items-center justify-end gap-2 relative cursor-pointer`}
      >
        <select
          value={langKey}
          onChange={handleLanguageChange}
          className="text-white bg-black focus:outline-none px-2 items-center "
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
              {lang.language}
            </option>
          ))}
        </select>

        <Link to={"/browse/gpt"}>
          <button className="mx-2 px-2 py-1 hidden lg:block bg-[#E50000] cursor-pointer text-white rounded-md">
            {lang[langKey].gptBtn}
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
                {lang[langKey].hi},{" "}
                {user?.displayName ? user?.displayName?.split(" ")[0] : "Guest"}
              </li>
              <li className="my-2 hover:bg-gray-300 hover:text-black rounded-md px-2 py-1">
                <i className="ri-sun-fill mr-4"></i>{lang[langKey].lightMode}
              </li>
              <Link to={"/browse/saved"}>
                {" "}
                <li className="my-2 hover:bg-gray-300 hover:text-black rounded-md px-2 py-1">
                  <i className="ri-bookmark-2-fill mr-4"></i>{lang[langKey].saved}
                </li>
              </Link>
              <li
                onClick={handleSignOut}
                className="my-2 hover:bg-gray-300 hover:text-black rounded-md px-2 py-1 "
              >
                <i className="ri-logout-box-r-line mr-4"></i>
                {lang[langKey].logOut}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderBrowse;
