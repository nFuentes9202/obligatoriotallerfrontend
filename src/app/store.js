import {configureStore} from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import eventsSlice from './slices/eventsSlice'

export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        eventsSlice: eventsSlice,
    },
})