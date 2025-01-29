import axiosInstance from "../../axiosConfig";
import { addTMDBResultData } from "../gptSlice";

const gptToTmdbDataAsync = () => async (dispatch, getState) => {
  const gptResults = getState().gpt.gptResults.map((query) => query.trim().toLowerCase());
  console.log("GPT Results:", gptResults);

  try {
    const requests = gptResults.map((query) =>
      axiosInstance.get(
        `/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
      )
    );

    const responses = await Promise.all(requests);

    // Extract and filter data to include only exact matches
    const tmdbData = responses.map((response, index) => {
      return response.data.results.filter(
        (item) =>
          item.original_title?.toLowerCase() === gptResults[index] || item.title?.toLowerCase() === gptResults[index] ||
          item.original_name?.toLowerCase() === gptResults[index] || item.name?.toLowerCase() === gptResults[index]
      );
    });

    console.log("Filtered TMDB Data:", tmdbData);

    // Dispatch the filtered data
    dispatch(addTMDBResultData(tmdbData));
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
  }
};

export default gptToTmdbDataAsync;


