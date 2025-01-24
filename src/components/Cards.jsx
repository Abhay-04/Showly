import { Link } from "react-router-dom";
import { NO_IMAGE_URL } from "../utils/constants";
const Cards = ({ data, title }) => {
 
  
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
            <img alt={d.id}
              className="w-full h-[160px] sm:h-[280px] rounded-xl  object-center object-cover  
               " 
              src={
                d.backdrop_path || d.profile_path || d.poster_path === null
                  ? `https://image.tmdb.org/t/p/w500/${
                      d.backdrop_path || d.profile_path || d.poster_path
                    } `
                  : NO_IMAGE_URL
              }
            />
            <h4 className=" text-base sm:text-md  font-semibold pt-2">
              {d.original_title ||
                d.title ||
                d.name ||
                d.original_name}
            </h4>
            <h4 className="text-sm sm:text-md font-medium">
  {new Date(d.release_date || d.first_air_date).toLocaleDateString('en-US', {
    month: 'short', // Short form for months (e.g., Jan, Feb, Mar)
    day: '2-digit', // Two-digit day (e.g., 23)
    year: 'numeric', // Full year (e.g., 2024)
  })}
</h4>

          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
