import { watchListI } from '@interfaces/watchlist';
import { createSlice } from '@reduxjs/toolkit';

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: [],
    reducers: {
        addMovie: (state: watchListI[], action) => {
            const newMovie: watchListI = {
                id:  action.payload.id,
                title: action.payload.title,
                backdrop_path: action.payload.backdrop_path,
                release_date: action.payload.release_date
            }
            localStorage.setItem('watchlist', JSON.stringify([...state, newMovie]))
            state.push(newMovie)
        },
        deleteMovie: (state, action) => {
            return state.filter((movie: watchListI) => movie.id !== action.payload.id);
        },
    },
});


export const { addMovie, deleteMovie } = watchlistSlice.actions;

export default watchlistSlice.reducer;