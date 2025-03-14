import { useEffect } from "react";
import tvDataAsync from "../store/actions/tvDataAsync";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../utils/hooks/usedropdown";

import Cards from "./Cards";

import InfiniteScroll from "react-infinite-scroll-component";
import { addTvData, changeTvCategory, setPage } from "../store/tvSlice";
import Loading from "./Loading";
import lang from "../utils/languageConstants";

const Tv = () => {
  const langKey = useSelector((store) => store.config.language);
  const dispatch = useDispatch();

  const category = useSelector((store) => store.tv.category);

  const data = useSelector((store) => store.tv.data);

  const fetchTvData = () => {
    dispatch(setPage(1));
    dispatch(addTvData([]));
    dispatch(tvDataAsync());
  };

  const handleSelectCategory = (selectedOption) => {
    dispatch(changeTvCategory(selectedOption.toLowerCase()));
  };

  useEffect(() => {
    fetchTvData();
  }, [category]);

  return data.length == 0 ? (
    <Loading />
  ) : (
    <div className="bg-black">
      <div className="grid grid-cols-12 gap-y-4 px-8 ">
        <div className="col-span-6">
          <h1 className="text-2xl font-semibold text-white">
            {/* <div onClick={() => navigate(-1)}>Back</div> */}
            {lang[langKey].tvShows}
          </h1>
        </div>
        <div className="col-span-6 flex justify-end gap-4">
          <Dropdown
            title={category.toUpperCase()}
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
            onSelect={handleSelectCategory}
          />
        </div>
      </div>
      <div className="mx-auto">
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={() => dispatch(tvDataAsync())}
          loader={<Loading />}
          scrollableTarget="scrollableDiv" // Target the right-side container
        >
          <Cards data={data} title={"tv"} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Tv;
