
import { Link } from "react-router-dom";
import HeaderBrowse from "./HeaderBrowse";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const Error = () => {
  const langKey = useSelector((store) => store.config.language);
  return (
    <div className="bg-black w-full h-[100vh]">
      <HeaderBrowse />
     <div className="flex flex-col justify-center items-center"> 
     <img className="h-[60vh]" src="https://w0.peakpx.com/wallpaper/315/283/HD-wallpaper-error-404-error-computer-typography-black-dark.jpg"/>
       <Link to={"/browse"}>
       <button className="bg-[#E50000] text-white font-semibold px-6 py-3 rounded-lg"> <i className="ri-home-2-fill mr-2"></i>{lang[langKey].home}</button></Link> 
     </div>
    </div>
  );
};

export default Error;
