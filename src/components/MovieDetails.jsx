import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import movieDetailsAsync from "../store/actions/movieDetailsAsyncLoad";
import HeaderBrowse from "./HeaderBrowse";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();

  const data = useSelector((store) => store.movieDetails.info);
  console.log(data);

  useEffect(() => {
    dispatch(movieDetailsAsync(id));
  }, []);
 

 
  
  return <div>
     <HeaderBrowse />
    {data.details.original_title}</div>;
};

export default MovieDetails;
