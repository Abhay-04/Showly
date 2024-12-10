import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import movieDetailsAsync from "../store/actions/movieDetailsAsyncLoad";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(movieDetailsAsync(id));
  }, []);
 

 
  
  return <div>MovieDetails</div>;
};

export default MovieDetails;
