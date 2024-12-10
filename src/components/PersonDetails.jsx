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

  return <div>
    <HeaderBrowse />
    PersonDetails</div>;
};

export default PersonDetails;
