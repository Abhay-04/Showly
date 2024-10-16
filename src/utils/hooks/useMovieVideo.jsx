import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig";
import { useEffect } from "react";
import { addRandomMovieKey } from "../../store/moviesSlice";

const useMovieTrailerKey = () => {
  // Get id of random movie from store
  const movieId = useSelector((store) => store?.movies?.randomMovieId);

  const dispatch = useDispatch();

  // Fetch movie trailer using movieId
  const fetchTrailerOfRandomMovie = async () => {
    try {
      if (movieId) {
        const response = await axiosInstance.get(`/movie/${movieId}/videos`);
        console.log(response);
        dispatch(addRandomMovieKey(response.data.results));
      } else {
        console.log("Movie ID is not available");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add data to store if movieId exists
  useEffect(() => {
    if (movieId) {
      fetchTrailerOfRandomMovie();
    }
  }, [movieId]); // Re-run when movieId changes
};

export default useMovieTrailerKey;
