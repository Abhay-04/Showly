import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import tvDetailsAsync from "../store/actions/tvDetailsAsync";
import HeaderBrowse from "./HeaderBrowse";

const TvDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(tvDetailsAsync(id));
  }, []);

  return (
    <div>
      <HeaderBrowse />
      TvDetails
    </div>
  );
};

export default TvDetails;
