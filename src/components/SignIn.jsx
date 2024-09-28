import { useState, useRef } from "react";
import { validate } from "../utils/validate";

const SignIn = () => {
  const [isSignForm, setIsSignForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const confirmPassword = useRef(null);

  const handleSignUp = () => {
    setIsSignForm(!isSignForm);
  };

  const handleButtonClick = () => {
    // validate the form data
    const errorMessage = validate(
      email.current.value,
      password.current.value,
      fullName.current.value,
      confirmPassword.current.value
    );
    setErrorMessage(errorMessage);
    console.log(errorMessage);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className=" h-screen flex justify-center sm:justify-center items-center sm:items-center  bg-no-repeat bg-cover bg-black sm:bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg')]">
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
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                showPassword ? "ri-eye-line" : "ri-eye-close-line"
              } text-white`}
            ></i>
          </div>

          {!isSignForm && (
            <input
              ref={confirmPassword}
              type="password"
              className="py-4 pl-4 pr-24 items-start text-md font-semibold mb-1 rounded-sm bg-black border border-gray-500 text-white"
              placeholder="Confirm Password"
            />
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
            <p className="text-white text-lg self-center my-1">OR</p>
          )}

          {isSignForm && (
            <button className="bg-[#a19e9ef6] px-6 py-2 text-white rounded-sm font-bold ">
              Continue as a Guest
            </button>
          )}

          {isSignForm && (
            <h5 className="text-white text-md font-semibold self-center my-2">
              Forgot password?
            </h5>
          )}
          <h5 className="text-white text-md  my-2">
            {isSignForm ? "New to Trailermate?" : "Already User? "}{" "}
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
