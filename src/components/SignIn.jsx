import { useState, useRef } from "react";
import { validate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  auth,
  provider,
  signInWithPopup,
  signInAnonymously,
} from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { USER_AVATAR } from "../utils/constants";

const SignIn = () => {
  const [isSignForm, setIsSignForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const confirmPassword = useRef(null);

  const dispatch = useDispatch();

  const handleSignUp = () => {
    setIsSignForm(!isSignForm);
  };

  const handleButtonClick = () => {
    // validate the form data

    const errorMessage = validate(
      email.current.value,
      password.current.value,
      !isSignForm && fullName.current.value,
      !isSignForm && confirmPassword.current.value
    );

    setErrorMessage(errorMessage);

    if (errorMessage !== null) return "done validation";

    if (!isSignForm) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
          // ..
        });
    } else {
      //signin logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    }
  };

  const handleSignInAnonymously = () => {
    signInAnonymously(auth)
      .then((result) => {
        // Successfully signed in anonymously
        console.log("Signed in anonymously as:", result.user);
        updateProfile(result.user, {
          displayName: "Guest",
          photoURL: USER_AVATAR,
        }).then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
        });
      })
      .catch((error) => {
        console.error("Error during anonymous sign-in", error);
      });
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Successfully logged in
        console.log(result.user);
      })
      .catch((error) => {
        console.error("Error during login", error);
      });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className=" h-screen pt-20  flex justify-center sm:justify-center items-center sm:items-center  bg-no-repeat bg-cover bg-black sm:bg-[url('https://analyticsindiamag.com/wp-content/uploads/2019/05/apps.55787.9007199266246365.687a10a8-4c4a-4a47-8ec5-a95f70d8852d.jpg')]">
        <div className="flex flex-col gap-3 w-full   sm:min-w-[400px] h-auto lg:min-h-[70vh]   sm:w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[24vw]  bg-black opacity-95 p-4 sm:py-12  sm:px-14 rounded-md  ">
          <h1 className="text-white text-4xl font-bold mb-4">
            {isSignForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignForm && (
            <input
              ref={fullName}
              type="text"
              className="py-4 pl-4 pr-24 items-start text-md font-semibold mb-1 rounded-sm bg-black border border-gray-500 text-white "
              placeholder="Full Name"
            />
          )}

          <input
            ref={email}
            type="text"
            className="py-4 pl-4 pr-24 items-start text-md font-semibold mb-1 rounded-sm bg-black border border-gray-500 text-white "
            placeholder="Email"
          />

          <div className="relative items-start text-md font-semibold mb-1 rounded-sm bg-black border border-gray-500 text-white">
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              className="py-4 pl-4 pr-10 text-md font-semibold bg-black w-full"
              placeholder="Password"
            />
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={` text-xl absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer pr-1 ${
                showPassword ? "ri-eye-line" : "ri-eye-close-line"
              } text-white`}
            ></i>
          </div>

          {!isSignForm && (
            <div className="relative items-start text-md font-semibold mb-1 rounded-sm bg-black border border-gray-500 text-white">
              <input
                ref={confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                className="py-4 pl-4 pr-10 text-md font-semibold bg-black w-full"
                placeholder="Confirm Password"
              />

              <i
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={` text-xl absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer pr-1 ${
                  showConfirmPassword ? "ri-eye-line" : "ri-eye-close-line"
                } text-white`}
              ></i>
            </div>
          )}

          <p className="text-red-600 text-md font-bold p-2 ">{errorMessage}</p>

          <button
            onClick={handleButtonClick}
            className="bg-red-600 px-6 py-2 text-white rounded-sm font-bold "
            type="submit"
          >
            {isSignForm ? "Sign In" : "Sign Up"}
          </button>

          {isSignForm && (
            <h5 className="text-white text-md font-semibold mt-4 cursor-pointer  ">
              Forgot password?
            </h5>
          )}

          {isSignForm && (
            <p className="text-white text-lg self-center my-1">OR</p>
          )}

          {isSignForm && (
            <button
              onClick={handleGoogleLogin}
              className="bg-[#a19e9ef6] px-6 py-2 text-white rounded-sm font-bold "
            >
              Login with google
            </button>
          )}

          {isSignForm && (
            <button
              onClick={handleSignInAnonymously}
              className="bg-[#a19e9ef6] px-6 py-2 text-white rounded-sm font-bold "
            >
              Continue as a Guest
            </button>
          )}

          <h5 className="text-white text-md pt-4 ">
            {isSignForm ? "New to Showly?" : "Already User? "}{" "}
            <span
              onClick={handleSignUp}
              className="font-extrabold cursor-pointer"
            >
              {isSignForm ? "Sign Up now" : "Sign In now"}
            </span>{" "}
          </h5>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
