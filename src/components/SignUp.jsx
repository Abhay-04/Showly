const SignUp = () => {
  return (
    <div className=" h-screen flex justify-start sm:justify-center items-start sm:items-center pt-24    object-cover bg-black sm:bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg')]">
      <div className="flex flex-col gap-4 w-full sm:w-[50%] lg:w-[35%]  bg-black p-4 sm:py-16 sm:px-10  ">
        <h1 className="text-white text-4xl font-bold mb-4">Sign In</h1>
        <input type="text" className="p-4 text-md font-semibold mb-1 rounded-sm bg-black border border-gray-500 text-gray-800" placeholder="Email" />
        {/* <input type="text" placeholder="Name" /> */}
        <input type="password" className="p-4 text-md font-semibold mb-1 rounded-sm bg-black border border-gray-500 text-gray-800" placeholder="Password" />

        {/* <input type="password" placeholder="Confirm Password" /> */}
        <button
          className="bg-red-600 px-6 py-2 text-white rounded-sm font-bold "
          type="button"
        >
          Sign In
        </button>
        <h5 className="text-white text-lg self-center my-2">Forgot password?</h5>
        <h5 className="text-white text-md  my-2">New to Trailermate? <span className="font-extrabold">Sign up now.</span> </h5>
      </div>
    </div>
  );
};

export default SignUp;
