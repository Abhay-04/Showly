import axiosInstance from "../../axiosConfig";
import { addTvDetailsData } from "../tvDetailsSlice";

const tvDetailsAsync =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      const details = await axiosInstance.get(`/tv/${id}`);
      const cast = await axiosInstance.get(`tv/${id}/credits`);

      const recommendations = await axiosInstance.get(
        `tv/${id}/recommendations`
      );
      const externalId = await axiosInstance.get(`/tv/${id}/external_ids`);
      const similar = await axiosInstance.get(`/tv/${id}/similar`);
      const translations = await axiosInstance.get(`/tv/${id}/translations`);
      const watchProviders = await axiosInstance.get(
        `/tv/${id}/watch/providers`
      );
      const videos = await axiosInstance.get(`/tv/${id}/videos`);

      const allDetails = {
        details: details.data,
        cast: cast.data.cast,
        recommendations: recommendations.data.results,
        externalId: externalId.data,
        similar: similar.data.results,
        translations: translations.data.translations,
        watchProviders: watchProviders.data.results.IN,
        videos: videos.data.results.find(v => v.type === "Trailer"),
      };

      dispatch(addTvDetailsData(allDetails));
    } catch (error) {
      console.log(error);
    }
  };

export default tvDetailsAsync;
