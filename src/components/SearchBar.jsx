import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import searchDataAsync from "../store/actions/searchDataAsync";
import { addQueryData } from "../store/searchSlice";
import { Link } from "react-router-dom";

const SearchBar = () => {
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
    <div>
      <div>
        <input
          className="w-full p-4 text-xl   border border-black"
          type="text"
          placeholder="Search for movies, TV shows, or people..."
          value={query}
          onChange={handleQuery}
        ></input>
      </div>
      <div className="w-[50%] bg-gray-200 ">
        {searchData.map((d) => (
          <Link to={`/${d.media_type}/${d.id}`}
            key={d.id}
            className="flex justify-between items-center px-8 py-2"
          >
            <img
              className="size-28"
              src={`https://image.tmdb.org/t/p/w500/${
                d.backdrop_path || d.profile_path || d.poster_path
              }`}
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
    </div>
  );
};

export default SearchBar;
