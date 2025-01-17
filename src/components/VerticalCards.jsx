// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { NO_IMAGE_URL } from "../utils/constants";

// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";

const VerticalCards = ({ data }) => {
  return (
    <div className="overflow-hidden">
      {" "}
      <Swiper
        spaceBetween={25}
        breakpoints={{
          // When the viewport width is >= 320px
          320: {
            slidesPerView: 2,
          },
          // When the viewport width is >= 640px
          640: {
            slidesPerView: 4,
          },
          // When the viewport width is >= 1024px
          1024: {
            slidesPerView: 5,
          },
          // When the viewport width is >= 1280px
          1280: {
            slidesPerView: 5,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((d) => (
          <SwiperSlide className="pb-20" key={d.id}>
            <Link to={`/${d.media_type}/${d.id}`} className="text-white">
              <img
                className="w-full h-[190px] rounded-md object-cover"
                src={
                  d.backdrop_path !== null
                    ? `https://image.tmdb.org/t/p/original/${d.backdrop_path}`
                    : NO_IMAGE_URL
                }
                alt={d.name || d.original_title || "Image"}
              />
              <h4 className="text-md pt-2 pb-1 font-semibold">
                {d.original_title || d.name || d.original_name}
              </h4>
              <h4>{d.release_date || d.first_air_date}</h4>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VerticalCards;
