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


const Trending = () => {
  const dispatch = useDispatch();

  const category = useSelector((store) => store.trending.category);
  const duration = useSelector((store) => store.trending.duration);
  const data = useSelector((store) => store.trending.data);

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
    <h1>loading</h1>
  ) : (
    <div className="bg-black">
      
      <div className="flex justify-between px-8 py-6 ">
        <h1 className="text-2xl text-white">
          {/* <div onClick={() => navigate(-1)}>Back</div> */}
          Trending
        </h1>
        <div className="flex gap-3">
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
      <div className="mx-auto">
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={() => dispatch(trendingDataAsync())}
          loader={<h1>Loading.....</h1>}
        >
          <Cards data={data} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Trending;
