import { createSlice } from "@reduxjs/toolkit";


const tredingSlice = createSlice({
    name: "trending",
    initialState: {
        movies: null,
        genres: null
    },
    reducers: {
        addTrendingMovies: (state, action) => {
            state.movies = action.payload;
        },
        addGenres: (state, action) => {
            state.genres = action.payload;
        }
    }
})


export const { addTrendingMovies , addGenres } = tredingSlice.actions;


export default tredingSlice.reducer;