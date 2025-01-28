import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import HeaderBrowse from "./HeaderBrowse";
import Loading from "./Loading";

import lang from "../utils/languageConstants";
import { toggleVideoMuted } from "../store/browseSlice";
import {
  removeTvDetailsData,
  toggleTvTrailerPlay,
} from "../store/tvDetailsSlice";
import tvDetailsAsync from "../store/actions/tvDetailsAsync";
import VerticalCards from "./VerticalCards";
import YtTrailer from "./YtTrailer";
import BottomBrowse from "./BottomBrowse";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const videoMutedStatus = useSelector((state) => state.browse.videoMuted);
  const langKey = useSelector((store) => store.config.language);
  const data = useSelector((store) => store.tvDetails.info);

  const tvTrailerPlay = useSelector((state) => state.tvDetails.tvTrailerPlay);

  const handlePlayTrailer = () => {
    dispatch(toggleTvTrailerPlay());
  };

  useEffect(() => {
    dispatch(removeTvDetailsData());
    dispatch(tvDetailsAsync(id));
    {
      tvTrailerPlay && dispatch(toggleTvTrailerPlay());
    }
  }, []);

  if (data == null) return <Loading />;

  return (
    <div>
      <HeaderBrowse />
      <div className="bg-black w-full  text-white px-6 sm:px-20 2xl:px-52 pb-40 sm:pb-20 ">
        <div
          className="grid grid-cols-12 gap-5 py-8  bg-cover bg-black bg-right"
          // style={{
          //   backgroundImage: `url(https://image.tmdb.org/t/p/original${data.details.backdrop_path})`,

          // }}
        >
          <div className={`col-span-12 sm:col-span-3 sm:w-[85%] flex flex-col items-center justify-center  rounded-xl ${ data?.watchProviders?.flatrate && "bg-[#032541]"}`}>
            <img
              className={`w-full h-[48vh]  ${ data?.watchProviders?.flatrate ? "rounded-t-xl" : "rounded-xl"} object-cover object-center`}
              src={`https://image.tmdb.org/t/p/original/${data.details.poster_path}`}
            />

            {data?.watchProviders?.flatrate ? (
              <div className="py-4 flex items-center gap-2">
                <img
                  className="size-10 object-fill object-center overflow-hidden rounded-md"
                  src={`https://image.tmdb.org/t/p/original${data?.watchProviders?.flatrate[0].logo_path}`}
                />{" "}
                <div className="leading-6">
                  <p className="text-sm">{lang[langKey].nowStreaming}</p>
                  <p className="font-bold">{lang[langKey].watchNow} </p>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className=" col-span-12 sm:col-span-9 pt-12 flex flex-col justify-between h-[80%] gap-y-4 ">
            <div>
              {" "}
              <h2 className="text-2xl font-bold">
                {data.details.original_title ||
                  data.details.title ||
                  data.details.name ||
                  data.details.original_name}
                <span className=" font-light text-2xl tracking-wide ml-2 text-[#ffffff71]">
                  ({new Date(data.details.first_air_date).getFullYear()})
                </span>
              </h2>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              <div>
                {data.details.adult ? (
                  <div className="border py-1 px-2">A</div>
                ) : (
                  <div className="border py-1 px-2">U/A 13+</div>
                )}
              </div>

              <div className="flex gap-x-2 flex-wrap">
                <i className="ri-movie-line"></i>
                <span>{data.details.genres.map((g) => g.name).join(" , ")}</span>
              </div>
            </div>

            <div className="text-xl font-bold">
              {Math.round(data.details.vote_average * 10)}% {lang[langKey].userScore}
            </div>

            <div className="sm:w-[85%] flex flex-col gap-y-1">
              <div className="text-gray-400">{data.details.tagline}</div>
              <div className="text-xl font-semibold">{lang[langKey].overView}</div>
              <div className="text-sm leading-6 py-3">
                {" "}
                {data.details.overview}
              </div>
            </div>

           

            <button
              onClick={handlePlayTrailer}
              className="bg-[#E50000] px-4 py-2 rounded-lg w-max "
            >
              <i className="ri-play-large-line mr-1"></i>
              {lang[langKey].playTrailer}
            </button>

            {tvTrailerPlay && <YtTrailer trailerKey={data?.videos?.key} />}
          </div>
        </div>
        {data.cast.length > 0 && (
          <div className="py-10 sm:py-20">
            <h2 className="text-3xl font-semibold py-5">{lang[langKey].topCast}</h2>
            <VerticalCards data={data.cast} mediaType={"person"} />
          </div>
        )}
        {data.details.seasons.length > 0 && (
          <div className="pb-10 sm:pb-20">
            <h2 className="text-3xl font-semibold py-5">{lang[langKey].seasons}</h2>
            <VerticalCards data={data.details.seasons} notClickable={true} />
          </div>
        )}

        {data.similar.length > 0 && (
          <div className="pb-10 sm:pb-20">
            <h2 className="text-3xl font-semibold py-5">{lang[langKey].similar}</h2>
            <VerticalCards data={data.similar} mediaType={"tv"} />
          </div>
        )}

        {data.recommendations.length > 0 && (
          <div className="pb-10 sm:pb-20">
            <h2 className="text-3xl font-semibold py-5">{lang[langKey].recommendations}</h2>
            <VerticalCards data={data.recommendations} mediaType={"tv"} />
          </div>
        )}
      </div>
     { !tvTrailerPlay && <BottomBrowse />}
    </div>
  );
};

export default MovieDetails;
