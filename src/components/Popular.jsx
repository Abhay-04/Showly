import { useEffect } from "react";
import popularDataAsync from "../store/actions/popularDataAsync";
import { useDispatch, useSelector} from "react-redux";
import Dropdown from "../utils/hooks/usedropdown";

import Cards from "./Cards";

import InfiniteScroll from "react-infinite-scroll-component";
import { addPopularData, changePopularCategory, setPage } from "../store/popularSlice";
import Loading from "./Loading";


const Popular = () => {
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
      
      <div className="flex justify-between px-8 py-6 ">
        <h1 className="text-2xl text-white">
          {/* <div onClick={() => navigate(-1)}>Back</div> */}
          Popular
        </h1>
        <div className="flex gap-3">
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
