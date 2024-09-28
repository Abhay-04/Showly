import Logo from "../../src/logo.jpg"


const Header = () => {
  return (
    <nav className="main p-3 sm:px-28 xl:px-56 absolute top-0 w-full ">
      <div className="inner  sm:flex sm:justify-between sm:items-center">
        <div className="logo w-40 sm:w-60 lg:w-72 mix-blend-luminosity sm:mb-16 ">
          <img src={Logo} />
        </div>
        
      </div>
    </nav>
  );
};

export default Header;
