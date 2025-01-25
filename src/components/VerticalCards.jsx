// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { NO_IMAGE_URL } from "../utils/constants";

// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";
import MovieDetails from "./TvDetails";




const VerticalCards = ({ data }) => {


  return (
    <div className="">
      {" "}
      <Swiper
        spaceBetween={0}
        breakpoints={{
          // When the viewport width is >= 320px
          250: {
            slidesPerView: 1.2,
          },
          // When the viewport width is >= 640px
          640: {
            slidesPerView: 3.5,
          },
          // When the viewport width is >= 1024px
          1024: {
            slidesPerView: 3.5,
          },
          // When the viewport width is >= 1280px
          1280: {
            slidesPerView: 5.5,
          },
        }}
      >
        {data.map((d) => (
          <SwiperSlide  key={d.id}>
            <Link 
            onClick={<MovieDetails />}
              to={
                d.media_type ? `/${d.media_type}/${d.id} ` : `/person/${d.id}`
              }
              className="text-white"
            >
              <img
                className="w-[85%] h-auto sm:h-[260px] 2xl:h-[320px] rounded-xl object-cover object-top"
                src={
                  d.backdrop_path !== null
                    ? `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.profile_path
                      }`
                    : NO_IMAGE_URL
                }
                alt={d.name || d.original_title || "Image"}
              />
              <h4 className="text-md py-2 font-semibold w-[90%]">
                {d.original_title || d.name || d.original_name }
              </h4>
              <h4 className="text-md font-semibold">
                {d.character ? d?.character : ""}
              </h4>
              <h4>
                {d?.release_date || d?.first_air_date
                  ? new Date(
                      d.release_date || d.first_air_date
                    ).toLocaleDateString("en-US", {
                      month: "short", // Short form for months (e.g., Jan, Feb, Mar)
                      day: "2-digit", // Two-digit day (e.g., 23)
                      year: "numeric", // Full year (e.g., 2024)
                    })
                  : ""}
              </h4>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VerticalCards;
