import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",

  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTgzZDhhOWQzOTU0NmIyMzYzNWIxMGM4MDVkN2EwNiIsIm5iZiI6MTcyODA0NjI4OS4zNjk1MDUsInN1YiI6IjY1ZDhjM2VhOTQ0YTU3MDE2MzI0MjNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XU96WD9hLsah6XvmL4jJoKcBieVfbo6M4b6ZW93128c",
  },
});

export default axiosInstance;
