// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { NO_IMAGE_URL } from "../utils/constants";

// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import TvDetails from "./TvDetails";

const VerticalCards = ({ data, mediaType, notClickable }) => {
  

  return (
    <div className="">
      <Swiper
        spaceBetween={0}
        breakpoints={{
          250: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 3.5,
          },
          1024: {
            slidesPerView: 3.5,
          },
          1280: {
            slidesPerView: 5.5,
          },
        }}
      >
        {data.map((d) => (
          <SwiperSlide key={d.id}>
            {notClickable ? (
              <div className="text-white">
                <img
                  className="w-[85%] h-auto sm:h-[260px] 2xl:h-[320px] rounded-xl object-cover object-top"
                  src={
                    d.backdrop_path !== null
                      ? `https://image.tmdb.org/t/p/original/${
                          d.backdrop_path || d.profile_path || d.poster_path
                        }`
                      : NO_IMAGE_URL
                  }
                  alt={d.name || d.original_title || "Image"}
                />
                <h4 className="text-md py-2 font-semibold w-[90%]">
                  {d.original_title || d.name || d.original_name}
                </h4>
                <h4 className="text-md font-semibold">
                  {d.character ? d?.character : ""}
                </h4>

                <h4 className="text-md font-semibold">
                  {d.episode_count ? d?.episode_count : "0"} Episodes
                </h4>
                
                
                <h4>
                  {d?.release_date || d?.first_air_date
                    ? new Date(
                        d.release_date || d.first_air_date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </h4>
              </div>
            ) : (
              <Link
              onClick={<MovieDetails /> || <TvDetails />}
                to={
                  d.media_type
                    ? `/${d.media_type}/${d.id}`
                    : `/${mediaType}/${d.id}`
                }
                className="text-white"
              >
                <img
                  className="w-[85%] h-auto sm:h-[260px] 2xl:h-[320px] rounded-xl object-cover object-top"
                  src={
                    d.backdrop_path !== null
                      ? `https://image.tmdb.org/t/p/original/${
                          d.backdrop_path || d.profile_path || d.poster_path
                        }`
                      : NO_IMAGE_URL
                  }
                  alt={d.name || d.original_title || "Image"}
                />
                <h4 className="text-md py-2 font-semibold w-[90%]">
                  {d.original_title || d.name || d.original_name}
                </h4>
                <h4 className="text-md font-semibold">
                  {d.character ? d?.character : ""}
                </h4>
              
                
                <h4>
                  {d?.release_date || d?.first_air_date
                    ? new Date(
                        d.release_date || d.first_air_date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </h4>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VerticalCards;
