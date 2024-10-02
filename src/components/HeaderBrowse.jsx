import React from "react";
import Logo from "../../src/logo.jpg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../store/userSlice";
import { USER_AVATAR } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const HeaderBrowse = () => {
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
    <div className="flex justify-between items-center px-12 bg-black text-white">
      <div className="logo">
        <img className="w-32 h-28" src={Logo} />
      </div>
      <div className="right-nav flex items-center gap-2">
        <div className="flex items-center">
          <img
            className="size-8 rounded-full mx-2"
            src={user?.photoURL ? user?.photoURL : USER_AVATAR}
          />
          <p>{user?.displayName ? user?.displayName : "Guest"}</p>
          <i className="ri-arrow-down-s-line"></i>
          <div
            className="bg-red-500 text-center mt-2  px-6 py-2 rounded-md w-full text-white cursor-pointer "
            onClick={handleSignOut}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBrowse;


