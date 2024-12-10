import axiosInstance from "../../axiosConfig";
import { addSearchData } from "../searchSlice";

const searchDataAsync = () => async (dispatch, getState) => {
  const searchData = getState();
  const query = searchData.searchData.query;

  try {
    const data = await axiosInstance.get(
      `/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
    );

    dispatch(addSearchData(data.data.results));
  } catch (error) {
    console.log(error);
  }
};

export default searchDataAsync;
