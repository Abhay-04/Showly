// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { NO_IMAGE_URL } from "../utils/constants";

// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import TvDetails from "./TvDetails";

const VerticalCards = ({
  title,
  data,
  mediaType,
  notClickable,
  qtyAbove1280 = 5.5,
  qtyAbove1024 = 3.5,
  qtyAbove640 = 3.5,
  qtyAbove250 = 1.2,
}) => {
  return (
    <div className="">
      <div className="text-xl sm:text-2xl font-bold mb-4">{title}</div>
      <Swiper
        spaceBetween={0}
        breakpoints={{
          250: {
            slidesPerView: qtyAbove250,
          },
          640: {
            slidesPerView: qtyAbove640,
          },
          1024: {
            slidesPerView: qtyAbove1024,
          },
          1280: {
            slidesPerView: qtyAbove1280,
          },
        }}
      >
        {data.map((d) => (
          <SwiperSlide key={d.id}>
            {notClickable ? (
              <div className="text-white bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg transform transition duration-300 hover:scale-105">
                <div className="relative rounded-xl overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <h4 className="text-md pt-2 pb-1 font-semibold w-[90%]">
                  {d.original_title || d.name || d.original_name}
                </h4>
                <h4 className="text-md font-semibold">
                  {d.character ? d?.character : ""}
                </h4>
                <h4>
                  {d?.release_date || d?.first_air_date || d?.air_date
                    ? new Date(
                        d.release_date || d.first_air_date || d?.air_date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </h4>
                <h4 className="text-md font-semibold">
                  {d.episode_count ? d?.episode_count : "0"} Episodes
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
                className="text-white bg-white/10 backdrop-blur-lg rounded-xl p-4 "
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
                  <img
                    className="w-[85%] h-[260px] sm:h-[260px] 2xl:h-[320px] rounded-xl object-cover object-top"
                    src={
                      d.backdrop_path !== null
                        ? `https://image.tmdb.org/t/p/original/${
                            d.backdrop_path || d.profile_path || d.poster_path
                          }`
                        : NO_IMAGE_URL
                    }
                    alt={d.name || d.original_title || "Image"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <h4 className="text-md pt-2 pb-1 font-semibold w-[90%]">
                  {d.original_title || d.name || d.original_name}
                </h4>
                <h4 className="text-md font-semibold">
                  {d.character ? d?.character : ""}
                </h4>
                <h4>
                  {d?.release_date || d?.first_air_date
                    ? new Date(
                        d?.release_date || d?.first_air_date
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
