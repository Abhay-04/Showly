import React, { useEffect } from "react";
import lang from "../utils/languageConstants";

import { useDispatch, useSelector } from "react-redux";
import searchDataAsync from "../store/actions/searchDataAsync";
import { addQueryData, removeQueryData } from "../store/searchSlice";
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

  useEffect(() => {
    handleSearchQuery();
  }, [query]);

  return (
    <div className="relative">
      <div>
        
        <input
          className="w-full  p-2 sm:p-4  text-sm sm:text-xl bg-transparent rounded-lg"
          type="text"
          placeholder={lang[langKey].searchPlaceholder}
          value={query}
          onChange={handleQuery}
        ></input>
      </div>
      {searchData.length > 0 && (
        <div
          onClick={dispatch(removeQueryData)}
          className=" bg-black overflow-hidden overflow-y-scroll h-[35vh] sm:h-[45vh] w-full absolute top-16 py-12 z-[1000] sm:text-lg "
        >
          {searchData.map((d) => (
            <Link
              to={`/${d.media_type}/${d.id}`}
              key={d.id}
              className="flex justify-between gap-4 items-center px-8 py-2"
            >
              <img
                className=" size-24 sm:size-36"
                src={
                  d.backdrop_path || d.profile_path || d.poster_path != null
                    ? `https://image.tmdb.org/t/p/w500/${
                        d.backdrop_path || d.profile_path || d.poster_path
                      }`
                    : NO_IMAGE_URL
                }
              />
              <h1>
                {d.original_title ||
                  d.original_title ||
                  d.name ||
                  d.original_name}
              </h1>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
