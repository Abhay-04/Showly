import axiosInstance from "../../axiosConfig";
import { addTvData, setPage } from "../tvSlice";


const tvDataAsync = () => async (dispatch, getState) => {
  const tv = getState();
  const category = tv.tv.category;
 
  let page = tv.tv.page;

  try {
    const response = await axiosInstance.get(
      `tv/${category}?page=${page}`
    );
    const newData = response?.data?.results;
    console.log(newData);

    // Merge new data with the existing store data
    const existingData = tv.tv.data || [];
    const updatedData = [...existingData, ...newData];

    await dispatch(addTvData(updatedData));

    page += 1;

    dispatch(setPage(page));
  } catch (error) {
    console.log(error);
  }
};

export default tvDataAsync;
