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
import Loading from "./Loading";
import lang from "../utils/languageConstants";


const Movies = () => {
  const langKey = useSelector((store) => store.config.language);
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
    <Loading />
  ) : (
    <div className="bg-black" >
     
      <div className="grid grid-cols-12 gap-y-4 px-8">
       <div className="col-span-6">
       <h1 className="text-2xl font-semibold text-white">
          {/* <div onClick={() => navigate(-1)}>Back</div> */}
          {lang[langKey].movies}
        </h1>
       </div>
        <div className="col-span-6 flex justify-end gap-4 ">
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
          loader={<Loading />}
          scrollableTarget="scrollableDiv" // Target the right-side container
        >
          <Cards data={data} title={"movie"} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Movies;
