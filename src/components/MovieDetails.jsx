import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import movieDetailsAsync from "../store/actions/movieDetailsAsyncLoad";
import HeaderBrowse from "./HeaderBrowse";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(movieDetailsAsync(id));
  }, []);
 

 
  
  return <div>
     <HeaderBrowse />
    MovieDetails</div>;
};

export default MovieDetails;
