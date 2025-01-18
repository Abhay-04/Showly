import { Link } from "react-router-dom";
import { NO_IMAGE_URL } from "../utils/constants";
const Cards = ({ data, title }) => {
  // console.log(data);
  // console.log(title);
  
  return (
    <div className="overflow-hidden grid  gap-x-6 gap-y-16 grid-cols-12 px-8 mt-8  ">
      {data.map((d) => (
        <div
          className="col-span-6 sm:col-span-4 xl:col-span-3 2xl:col-span-2 "
          key={d.id}
        >
          <Link
            to={`/${d.media_type || title}/${d.id}`}
            className="text-white  "
          >
            <img
              className="w-full h-auto sm:h-[220px] rounded-xl object-cover
               "
              src={
                d.backdrop_path || d.profile_path || d.poster_path === null
                  ? `https://image.tmdb.org/t/p/w500/${
                      d.backdrop_path || d.profile_path || d.poster_path
                    } `
                  : NO_IMAGE_URL
              }
            />
            <h4 className=" text-base sm:text-lg pt-4 pb-1 font-semibold">
              {d.original_title ||
                d.original_title ||
                d.name ||
                d.original_name}
            </h4>
            <h4 className="font-medium">{d.release_date || d.first_air_date}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
