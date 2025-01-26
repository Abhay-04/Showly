import axiosInstance from "../../axiosConfig";
import { addMovieDetailsData } from "../movieDetailsSlice";

const movieDetailsAsync =
  ({ id }) =>
  async (dispatch) => {
    try {
      const details = await axiosInstance.get(`/movie/${id}`);
      const watchProviders = await axiosInstance.get(`movie/${id}/watch/providers`)
      const cast = await axiosInstance.get(`/movie/${id}/credits`)

      const recommendations = await axiosInstance.get(
        `movie/${id}/recommendations`
      );
      const externalId = await axiosInstance.get(`/movie/${id}/external_ids`);
      const similar = await axiosInstance.get(`/movie/${id}/similar`);
      const translations = await axiosInstance.get(`/movie/${id}/translations`);
      const videos = await axiosInstance.get(`/movie/${id}/videos`);

      const allDetails = {
        details: details.data,
        watchProviders: watchProviders.data.results.IN,
        cast: cast.data.cast,
        recommendations: recommendations.data.results,
        externalId: externalId.data,
        similar: similar.data.results,
        translations: translations.data.translations,
        videos: videos.data.results.find(v => v.type === "Trailer")
      };

      dispatch(addMovieDetailsData(allDetails));
    } catch (error) {
      console.log(error);
    }
  };

export default movieDetailsAsync;
