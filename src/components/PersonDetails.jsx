import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import personDetailsAsync from "../store/actions/personDetailsAsync";
import HeaderBrowse from "./HeaderBrowse";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(personDetailsAsync(id));
  }, []);

  return (
    <div className="bg-black  h-[100vh] text-white ">
      <HeaderBrowse />
      <div>Kaam Pragati par hai</div>
    </div>
  );
};

export default PersonDetails;
