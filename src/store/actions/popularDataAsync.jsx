import axiosInstance from "../../axiosConfig";
import { addPopularData , setPage } from "../popularSlice";


const popularDataAsync = () => async (dispatch, getState) => {
  const popular = getState();
  const category = popular.popular.category;
  
  let page = popular.popular.page;

  try {
    const response = await axiosInstance.get(
      `/${category}/popular?page=${page}`
    );
    const newData = response?.data?.results;
    console.log(newData);

    // Merge new data with the existing store data
    const existingData = popular.popular.data || [];
    const updatedData = [...existingData, ...newData];

    await dispatch(addPopularData(updatedData));

    page += 1;

    dispatch(setPage(page));
  } catch (error) {
    console.log(error);
  }
};

export default popularDataAsync;
