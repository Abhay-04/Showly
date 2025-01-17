import { useEffect } from "react";
import trendingDataAsync from "../store/actions/trendingDataAsync";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../utils/hooks/usedropdown";
import {
  addTrendingData,
  changeTrendingCategory,
  changeTrendingDuration,
  setPage,
} from "../store/trendingSlice";

import Cards from "./Cards";

import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import lang from "../utils/languageConstants";

const Trending = () => {
  const dispatch = useDispatch();

  const category = useSelector((store) => store.trending.category);
  const duration = useSelector((store) => store.trending.duration);
  const data = useSelector((store) => store.trending.data);
  const langKey = useSelector((store) => store.config.language);

  const fetchTrendingData = () => {
    dispatch(setPage(1));
    dispatch(addTrendingData([]));
    dispatch(trendingDataAsync());
  };

  const handleSelectCategory = (selectedOption) => {
    dispatch(changeTrendingCategory(selectedOption.toLowerCase()));
  };

  const handleSelectDuration = (selectedOption) => {
    dispatch(changeTrendingDuration(selectedOption.toLowerCase()));
  };

  useEffect(() => {
    fetchTrendingData();
  }, [category, duration]);

  return data.length == 0 ? (
    <Loading />
  ) : (
    <div className="bg-black ">
      <div className="grid grid-cols-12 gap-y-4 px-8 ">
        <div className="col-span-12 sm:col-span-6 ">
          <h1 className="text-2xl font-semibold  text-white">
            {/* <div onClick={() => navigate(-1)}>Back</div> */}
            {lang[langKey].trending}
          </h1>
        </div>
        <div className="col-span-12 sm:col-span-6 flex sm:justify-end gap-4  ">
          <Dropdown
            title={category.toUpperCase()}
            options={["Movie", "Tv", "All"]}
            onSelect={handleSelectCategory}
          />
          <Dropdown
            title={duration.toUpperCase()}
            options={["Week", "Day"]}
            onSelect={handleSelectDuration}
          />
        </div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={() => dispatch(trendingDataAsync())}
          loader={<h1>Loading.....</h1>}
          scrollableTarget="scrollableDiv" // Target the right-side container
        >
          <Cards data={data} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Trending;
