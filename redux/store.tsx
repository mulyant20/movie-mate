import {configureStore} from '@reduxjs/toolkit'
import watchlistSlice from './watchlist/watchlistSlice'

export default configureStore({
    reducer: {
        watchlist: watchlistSlice
    }
})