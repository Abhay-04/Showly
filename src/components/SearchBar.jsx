import { useEffect } from "react";
import lang from "../utils/languageConstants";

import { useDispatch, useSelector } from "react-redux";
import searchDataAsync from "../store/actions/searchDataAsync";
import {
  addQueryData,
  removeQueryData,
  removeSearchData,
} from "../store/searchSlice";
import { Link } from "react-router-dom";
import { NO_IMAGE_URL } from "../utils/constants";

const SearchBar = () => {
  const langKey = useSelector((store) => store.config.language);
  const dispatch = useDispatch();
  const query = useSelector((store) => store.searchData.query);
  const searchData = useSelector((store) => store.searchData.data);

  const handleQuery = (e) => {
    const query = e.target.value;
    dispatch(addQueryData(query));
  };

  const handleSearchQuery = () => {
    dispatch(searchDataAsync());
  };

  const handleRemoveQuery = () => {
    dispatch(removeQueryData());
  };

  useEffect(() => {
    handleSearchQuery();
  }, [query]);

  return (
    <div className="relative">
      <div className="flex items-center justify-center ">
        <i className="ri-search-line text-2xl -mr-8 cursor-pointer "></i>
        <input
          className="w-full  p-4 px-12  text-xs sm:text-xl bg-transparent cursor-pointer rounded-lg focus:outline-none"
          type="text"
          placeholder={lang[langKey].searchPlaceholder}
          value={query}
          onChange={handleQuery}
        ></input>
        {query && (
          <i
            onClick={handleRemoveQuery}
            className="ri-close-line text-2xl -ml-10 cursor-pointer"
          ></i>
        )}
      </div>
      {searchData.length > 0 && (
        <div
          onClick={dispatch(removeSearchData)}
          className=" bg-black overflow-hidden overflow-y-scroll h-[35vh] sm:h-[45vh] rounded-b-2xl w-full absolute top-16 py-12 z-[1000] sm:text-lg "
        >
          {searchData.map((d) => (
            <Link
              to={`/${d.media_type}/${d.id}`}
              key={d.id}
              className="grid grid-cols-12  items-start px-6 py-3 "
            >
             <div className="col-span-3 flex justify-center ">
             <img
                className=" size-24 sm:size-36 object-cover object-center rounded-xl"
                src={
                  d.backdrop_path || d.profile_path || d.poster_path != null
                    ? `https://image.tmdb.org/t/p/w500/${
                        d.backdrop_path || d.profile_path || d.poster_path
                      }`
                    : NO_IMAGE_URL
                }
              />
             </div>
              <div className="col-span-9 flex flex-col gap-2">
                <h1 className=" text-sm text-start sm:text-lg font-semibold">
                  {d.original_title ||
                    d.original_title ||
                    d.name ||
                    d.original_name}
                </h1>

              <div className="flex gap-x-3">
             { d?.release_date || d?.first_air_date && <span className=" text-sm text-start sm:text-sm font-semibold">
                  {d?.release_date || d?.first_air_date || ""}
                </span>}

           
                <span className=" text-sm text-start sm:text-sm font-semibold">
                  {d?.media_type.toUpperCase()}
                </span>
              </div>
               {d.overview && <h1 className=" text-sm text-start sm:text-sm font-semibold w-[80%]">
                  {d?.overview?.split(" ").slice(0, 20).join(" ")}...
                </h1>}

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
