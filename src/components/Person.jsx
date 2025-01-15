import { useEffect } from "react";
import personDataAsync from "../store/actions/personDataAsync";
import { useDispatch, useSelector } from "react-redux";

import Cards from "./Cards";

import InfiniteScroll from "react-infinite-scroll-component";
import { addPersonData, setPage } from "../store/personSlice";
import Loading from "./Loading";

const Person = () => {
  const dispatch = useDispatch();

  const data = useSelector((store) => store.person.data);

  const fetchPersonData = () => {
    dispatch(setPage(1));
    dispatch(addPersonData([]));
    dispatch(personDataAsync());
  };

  useEffect(() => {
    fetchPersonData();
  }, []);

  return data.length == 0 ? (
    <Loading />
  ) : (
    <div className="bg-black">
      <div className="grid grid-cols-12 gap-y-4 px-8">
        <div className="col-span-12">
          <h1 className="text-2xl font-semibold text-white">
            {/* <div onClick={() => navigate(-1)}>Back</div> */}
            People
          </h1>
        </div>
      </div>
      <div className="mx-auto">
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={() => dispatch(personDataAsync())}
          loader={<h1>Loading.....</h1>}
          scrollableTarget="scrollableDiv" // Target the right-side container
        >
          <Cards data={data} title={"person"} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Person;
