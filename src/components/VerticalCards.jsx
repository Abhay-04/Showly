// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const VerticalCards = ({ data }) => {
  console.log(data);
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
          <>
          <SwiperSlide><div>
            <img className="w-[160px] h-[190px] rounded-md" src={`https://image.tmdb.org/t/p/w500/${d.backdrop_path}` } />
             <h4>{d.original_title}</h4>
             <h4>{d.release_date}</h4>
            
            </div></SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default VerticalCards;
