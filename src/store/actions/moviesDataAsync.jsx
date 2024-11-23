import axiosInstance from "../../axiosConfig";
import { addMoviesData , setPage } from "../moviesSlice";

const moviesDataAsync = () => async (dispatch, getState) => {
  const movies = getState();
  const category = movies.movies.category;
 
  let page = movies.movies.page;

  try {
    const response = await axiosInstance.get(
      `movie/${category}?page=${page}`
    );
    const newData = response?.data?.results;
    console.log(newData);

    // Merge new data with the existing store data
    const existingData = movies.movies.data || [];
    const updatedData = [...existingData, ...newData];

    await dispatch(addMoviesData(updatedData));

    page += 1;

    dispatch(setPage(page));
  } catch (error) {
    console.log(error);
  }
};

export default moviesDataAsync;
