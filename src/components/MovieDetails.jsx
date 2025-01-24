import  { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import movieDetailsAsync from "../store/actions/movieDetailsAsyncLoad";
import HeaderBrowse from "./HeaderBrowse";
import Loading from "./Loading";
import { removeMovieDetailsData } from "../store/movieDetailsSlice";



const MovieDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();

  const data = useSelector((store) => store.movieDetails.info);
  console.log(data);

  useEffect(() => {
    dispatch(removeMovieDetailsData())
    dispatch(movieDetailsAsync(id));
    
    
  }, []);
 
  
 if(data == null ) return <Loading />
  
return(
  <div>
     <HeaderBrowse />
     <div className="bg-black w-full h-[100vh] text-white ">
     <div className="grid col-span-12 bg-red-600">

        <div className="bg-yellow-300 col-span-4">
          <img className="size-80" src={`https://image.tmdb.org/t/p/original/${data.details.poster_path}`}/>
          {/* <div>{data.watchProviders ? data?.watchProviders?.flatrate[0].provider_name : ""}</div> */}
        </div>
        <div className="bg-green-600 col-span-8">
         <div> <h2>{data.details.original_title || data.details.title || data.details.name || data.details.original_name}({new Date(data.details.release_date).getFullYear()})</h2></div>
         <div className="flex gap-4">
          <div>{data.details.adult ? "A" : "U/A 13+" }</div>
          <div>{data.details.release_date}</div>
          <div>{data.details.genres.map(g =>  <span key={g.id}>{g.name}</span> )}</div>
          <div>
  {Math.floor(data.details.runtime / 60)}h {data.details.runtime % 60}m
</div>
          </div>


          <div>
  {Math.round(data.details.vote_average * 10)}% user score
           </div>


           <div>
            {data.details.tagline}
            <h3>Overview</h3>
            {data.details.overview}
           </div>

           <div>
            <button>Play Trailer</button>
           </div>

        </div>
      </div>
     </div>
  </div>
  )
};

export default MovieDetails;
