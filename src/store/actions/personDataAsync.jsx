import axiosInstance from "../../axiosConfig";
import { addPersonData, setPage } from "../personSlice";

const personDataAsync = () => async (dispatch, getState) => {
  const person = getState();

  let page = person.person.page;

  try {
    const response = await axiosInstance.get(`person/popular?page=${page}`);
    const newData = response?.data?.results;
    console.log(newData);

    // Merge new data with the existing store data
    const existingData = person.person.data || [];
    const updatedData = [...existingData, ...newData];

    await dispatch(addPersonData(updatedData));

    page += 1;

    dispatch(setPage(page));
  } catch (error) {
    console.log(error);
  }
};

export default personDataAsync;
