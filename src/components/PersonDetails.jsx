import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import personDetailsAsync from "../store/actions/personDetailsAsync";
import HeaderBrowse from "./HeaderBrowse";
import Loading from "./Loading";
import { removePersonDetailsData } from "../store/personDetailsSlice";
import VerticalCards from "./VerticalCards";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();

  const data = useSelector((store) => store.personDetails.info);

  console.log(data);

  useEffect(() => {
    dispatch(removePersonDetailsData());
    dispatch(personDetailsAsync(id));
  }, []);

  if (data == null) return <Loading />;

  return (
    <div className="bg-black h-full text-white ">
      <HeaderBrowse />
      <div className=" w-full   text-white px-52">
        <div className="grid grid-cols-12 gap-x-8">
          <div className=" col-span-3 flex justify-end pt-6">
            <img
              className="size-96 h-[520px]   rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${data.details.profile_path}`}
            />
          </div>
          <div className="  p-6 col-span-9 flex flex-col gap-y-6">
            <h2 className="text-2xl font-bold"> {data.details.name}</h2>
            <div className="w-[90%] flex gap-2 flex-col">
              <h4 className="text-xl font-bold">Biography</h4>
              <p className="text-sm">{data.details.biography.split(" ")
                .slice(0, 80)
                .join(" ")}....more</p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-xl ">Known for</h4>
              <VerticalCards data={data.combinedCredits.cast} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
