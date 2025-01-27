import axiosInstance from "../../axiosConfig";
import { addPersonDetailsData } from "../personDetailsSlice";

const personDetailsAsync =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      const details = await axiosInstance.get(`/person/${id}`);

      const combinedCredits = await axiosInstance.get(
        `person/${id}/combined_credits`
      );
      const externalId = await axiosInstance.get(`/person/${id}/external_ids`);
      const movieCredits = await axiosInstance.get(
        `/person/${id}/movie_credits`  
      ); 
      const tvCredits = await axiosInstance.get(
        `/person/${id}/tv_credits
`
      );

      const allDetails = {
        details: details.data,
        combinedCredits: combinedCredits.data,
        externalId: externalId.data,
        movieCredits: movieCredits.data,
        tvCredits: tvCredits.data,
      };

      dispatch(addPersonDetailsData(allDetails));
    } catch (error) {
      console.log(error);
    }
  };

export default personDetailsAsync;
