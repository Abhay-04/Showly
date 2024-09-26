import Logo from "../../src/logo.jpg"


const Header = () => {
  return (
    <nav className="main p-3 sm:px-28 absolute top-0 w-full ">
      <div className="inner  sm:flex sm:justify-between sm:items-center">
        <div className="logo w-40 sm:w-60 lg:w-72 mix-blend-luminosity ">
          <img src={Logo} />
        </div>
        <div className="hidden sm:flex  nav-item">
          <button className="px-4 py-2 text-white font-semibold bg-red-500 rounded-md">Account</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
