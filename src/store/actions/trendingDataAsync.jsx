import axiosInstance from "../../axiosConfig";
import { addTrendingData, setPage } from "../trendingSlice";

const trendingDataAsync = () => async (dispatch, getState) => {
  const trending = getState();
  const category = trending.trending.category;
  const duration = trending.trending.duration;
  let page = trending.trending.page;

  try {
    const response = await axiosInstance.get(
      `trending/${category}/${duration}?page=${page}`
    );
    const newData = response?.data?.results;
    console.log(newData);

    // Merge new data with the existing store data
    const existingData = trending.trending.data || [];
    const updatedData = [...existingData, ...newData];

    await dispatch(addTrendingData(updatedData));

    page += 1;

    dispatch(setPage(page));
  } catch (error) {
    console.log(error);
  }
};

export default trendingDataAsync;
