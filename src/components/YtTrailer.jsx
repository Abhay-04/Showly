import { } from "react";
import { useDispatch} from "react-redux";

import { toggleMovieTrailerPlay } from "../store/movieDetailsSlice";
import { toggleTvTrailerPlay } from "../store/tvDetailsSlice";

const YtTrailer = ({ trailerKey }) => {
 

  const dispatch = useDispatch();

 

  
 




  const handleCloseTrailer = () => {
    dispatch(toggleMovieTrailerPlay());
    dispatch(toggleTvTrailerPlay());
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[5000]">
      <div className="relative w-full h-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <button
          onClick={handleCloseTrailer}
          className="absolute top-4 right-4 text-red text-xl"
        >
          <i className="ri-close-large-line text-4xl font-extrabold text-[#E50000]"></i>
        </button>
      </div>
    </div>
  );
};

export default YtTrailer;
