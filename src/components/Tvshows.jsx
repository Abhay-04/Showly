

import { useEffect } from "react";
import tvDataAsync from "../store/actions/tvDataAsync";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../utils/hooks/usedropdown";


import Cards from "./Cards";

import InfiniteScroll from "react-infinite-scroll-component";
import { addTvData, changeTvCategory, setPage } from "../store/tvSlice";


const Tv = () => {
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
    <h1>loading</h1>
  ) : (
    <div className="bg-gray-800 ">
      <div className="flex justify-between px-8 py-6 ">
        <h1 className="text-2xl text-white">
          {/* <div onClick={() => navigate(-1)}>Back</div> */}
          Movies
        </h1>
        <div className="flex gap-3">
          <Dropdown
            title={category.toUpperCase()}
            options={["airing_today","on_the_air", "popular", "top_rated"]}
            onSelect={handleSelectCategory}
          />
         
        </div>
      </div>
      <div className="mx-auto">
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={() => dispatch(tvDataAsync())}
          loader={<h1>Loading.....</h1>}
        >
          <Cards data={data} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Tv;

