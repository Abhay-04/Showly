import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import movieDetailsAsync from "../store/actions/movieDetailsAsyncLoad";
import HeaderBrowse from "./HeaderBrowse";
import Loading from "./Loading";
import {
  removeMovieDetailsData,
  toggleMovieTrailerPlay,
} from "../store/movieDetailsSlice";
import lang from "../utils/languageConstants";

import VerticalCards from "./VerticalCards";
import YtTrailer from "./YtTrailer";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();

  const movieTrailerPlay = useSelector(
    (state) => state.movieDetails.movieTrailerPlay
  );
  const langKey = useSelector((store) => store.config.language);
  const data = useSelector((store) => store.movieDetails.info);

  const handlePlayTrailer = () => {
    dispatch(toggleMovieTrailerPlay());
  };

  useEffect(() => {
    dispatch(removeMovieDetailsData());
    dispatch(movieDetailsAsync(id));
    {
      movieTrailerPlay && dispatch(toggleMovieTrailerPlay());
    }
  }, []);

  if (data == null) return <Loading />;

  return (
    <div>
      <HeaderBrowse />
      <div className="bg-black w-full  text-white px-52  ">
        <div
          className="grid grid-cols-12 gap-5 py-8  bg-cover bg-black bg-right"
          // style={{
          //   backgroundImage: `url(https://image.tmdb.org/t/p/original${data.details.backdrop_path})`,

          // }}
        >
          <div className=" col-span-3 w-[85%] flex flex-col items-center justify-center rounded-xl bg-[#032541]">
            <img
              className="w-full h-[48vh]  rounded-t-xl object-cover object-center"
              src={`https://image.tmdb.org/t/p/original/${data.details.poster_path}`}
            />

            {data?.watchProviders?.flatrate ? (
              <div className="py-4 flex items-center gap-2">
                <img
                  className="size-10 object-fill object-center overflow-hidden rounded-md"
                  src={`https://image.tmdb.org/t/p/original${data?.watchProviders?.flatrate[0].logo_path}`}
                />{" "}
                <div className="leading-6">
                  <p className="text-sm">{lang[langKey].nowStreaming} </p>
                  <p className="font-bold">{lang[langKey].watchNow}</p>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className=" col-span-9 pt-12 flex flex-col gap-y-4 ">
            <div>
              {" "}
              <h2 className="text-2xl font-bold">
                {data.details.original_title ||
                  data.details.title ||
                  data.details.name ||
                  data.details.original_name}
                <span className=" font-light text-2xl tracking-wide ml-2 text-[#ffffff71]">
                  ({new Date(data.details.release_date).getFullYear()})
                </span>
              </h2>
            </div>
            <div className="flex gap-x-4 items-center">
              <div>
                {data.details.adult ? (
                  <div className="border py-1 px-2">R</div>
                ) : (
                  <div className="border py-1 px-2">U/A 13+</div>
                )}
              </div>
              <div>
                <i className="ri-calendar-check-line mr-1"></i>
                {new Date(data.details.release_date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}
                 <span className="pl-2">(IN)</span>
              </div>

              <div className="flex gap-x-2">
                <i className="ri-movie-line"></i>
                {data.details.genres.map((g, index) => (
                  <span key={g.id}>
                    {g.name}
                    {index < data.details.genres.length - 1 && " , "}
                  </span>
                ))}
              </div>

              <div>
                <i className="ri-time-line mr-1"></i>
                {Math.floor(data.details.runtime / 60)}h{" "}
                {data.details.runtime % 60}m
              </div>
            </div>

            <div className="text-xl font-bold">
              {Math.round(data.details.vote_average * 10)}% {lang[langKey].userScore}
            </div>

            <div className="w-[85%] flex flex-col gap-y-1">
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

            {movieTrailerPlay && <YtTrailer trailerKey={data?.videos?.key} />}
          </div>
        </div>
        {data.cast.length > 0 && (
          <div className="py-20">
            <h2 className="text-3xl font-semibold py-5"> {lang[langKey].topCast}</h2>
            <VerticalCards data={data.cast} mediaType={"person"} />
          </div>
        )}

        {data.similar.length > 0 && (
          <div className="pb-20">
            <h2 className="text-3xl font-semibold py-5">{lang[langKey].similar}</h2>
            <VerticalCards data={data.similar} mediaType={"movie"} />
          </div>
        )}

        {data.recommendations.length > 0 && (
          <div className="pb-20">
            <h2 className="text-3xl font-semibold py-5">{lang[langKey].recommendations}</h2>
            <VerticalCards data={data.recommendations} mediaType={"movie"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
