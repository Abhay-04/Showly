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
        spaceBetween={10}
        slidesPerView={8}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((d) => (
          <div key={d.id}>
            <SwiperSlide>
              <Link to={`/${d.media_type}/${d.id}`} className="text-white ">
                <img
                  className="w-[160px] h-[190px] rounded-md"
                  src={ d.backdrop_path !== null ? `https://image.tmdb.org/t/p/original/${d.backdrop_path}` : NO_IMAGE_URL}
                />
                <h4>
                  {d.original_title ||
                    d.original_title ||
                    d.name ||
                    d.original_name}
                </h4>
                <h4>{d.release_date || d.first_air_date}</h4>
              </Link>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default VerticalCards;
