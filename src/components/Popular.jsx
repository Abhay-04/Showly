import { useEffect } from "react";
import popularDataAsync from "../store/actions/popularDataAsync";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../utils/hooks/usedropdown";
import lang from "../utils/languageConstants";

import Cards from "./Cards";

import InfiniteScroll from "react-infinite-scroll-component";
import {
  addPopularData,
  changePopularCategory,
  setPage,
} from "../store/popularSlice";
import Loading from "./Loading";

const Popular = () => {
  const langKey = useSelector((store) => store.config.language);
  const dispatch = useDispatch();

  const category = useSelector((store) => store.popular.category);

  const data = useSelector((store) => store.popular.data);

  const fetchPopularData = () => {
    dispatch(setPage(1));
    dispatch(addPopularData([]));
    dispatch(popularDataAsync());
  };

  const handleSelectCategory = (selectedOption) => {
    dispatch(changePopularCategory(selectedOption.toLowerCase()));
  };

  useEffect(() => {
    fetchPopularData();
  }, [category]);

  return data.length == 0 ? (
    <Loading />
  ) : (
    <div className="bg-black">
      <div className="grid grid-cols-12 gap-y-4 px-8">
        <div className="col-span-6">
          <h1 className="text-2xl font-semibold text-white">
            {/* <div onClick={() => navigate(-1)}>Back</div> */}
            {lang[langKey].popular}
          </h1>
        </div>

        <div className="col-span-6 flex justify-end gap-4 ">
          <Dropdown
            title={category.toUpperCase()}
            options={["Tv", "Movie"]}
            onSelect={handleSelectCategory}
          />
        </div>
      </div>
      <div className="mx-auto">
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={() => dispatch(popularDataAsync())}
          loader={<h1>Loading.....</h1>}
          scrollableTarget="scrollableDiv" // Target the right-side container
        >
          <Cards data={data} title={category} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Popular;
