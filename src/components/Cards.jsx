import { Link } from "react-router-dom";
import { NO_IMAGE_URL } from "../utils/constants";

const Cards = ({ data, title }) => {
  return (
    <div className="overflow-hidden grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-16 grid-cols-12 px-4 sm:px-8 mt-8">
      {data.map((d) => (
        <div
          className="col-span-6 sm:col-span-4 xl:col-span-3 2xl:col-span-2 transform transition duration-600 hover:scale-105 "
          key={d.id}
        >
          <Link to={`/${d.media_type || title}/${d.id}`} className="text-white">
            <div className="relative rounded-xl overflow-hidden">
              <img
                alt={d.id}
                className="w-full h-[180px] sm:h-[260px] 2xl:h-[320px] object-center object-cover"
                src={
                  d.backdrop_path || d.profile_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${
                        d.backdrop_path || d.profile_path || d.poster_path
                      } `
                    : NO_IMAGE_URL
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <h4 className="text-base sm:text-md font-semibold pt-2">
              {d.original_title || d.title || d.name || d.original_name}
            </h4>
            {d.release_date || d.first_air_date ? (
              <h4 className="text-sm sm:text-md font-medium">
                {new Date(
                  d.release_date || d.first_air_date
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </h4>
            ) : null}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
