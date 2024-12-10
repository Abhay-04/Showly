import { useEffect } from "react";
import moviesDataAsync from "../store/actions/moviesDataAsync";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../utils/hooks/usedropdown";

import Cards from "./Cards";

import InfiniteScroll from "react-infinite-scroll-component";
import {
  addMoviesData,
  changeMoviesCategory,
  setPage,
} from "../store/moviesSlice";
import SearchBar from "./SearchBar";

const Movies = () => {
  const dispatch = useDispatch();

  const category = useSelector((store) => store.movies.category);

  const data = useSelector((store) => store.movies.data);

  const fetchMoviesData = () => {
    dispatch(setPage(1));
    dispatch(addMoviesData([]));
    dispatch(moviesDataAsync());
  };

  const handleSelectCategory = (selectedOption) => {
    dispatch(changeMoviesCategory(selectedOption.toLowerCase()));
  };

  useEffect(() => {
    fetchMoviesData();
    
  }, [category]);

  return data.length == 0 ? (
    <h1>loading</h1>
  ) : (
    <div className="bg-gray-800 ">
      <SearchBar />
      <div className="flex justify-between px-8 py-6 ">
        <h1 className="text-2xl text-white">
          {/* <div onClick={() => navigate(-1)}>Back</div> */}
          Movies
        </h1>
        <div className="flex gap-3">
          <Dropdown
            title={category.toUpperCase()}
            options={["Now_playing", "Popular", "Top_rated", "Upcoming"]}
            onSelect={handleSelectCategory}
          />
        </div>
      </div>
      <div className="mx-auto">
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={() => dispatch(moviesDataAsync())}
          loader={<h1>Loading.....</h1>}
        >
          <Cards data={data} title={"movie"} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Movies;
