import { createSlice } from "@reduxjs/toolkit";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function formatDateFromString(dateString) {

    const datePart = dateString.split(" ")[0];
    
    const [year, month, day] = datePart.split("-");

    return `${year}-${month}-${day}`;
}

const eventsSlice = createSlice({

    name: "eventsSlice",
    initialState: {
        events: [],
        filterEvents: [],
    },

    
    reducers: {

        loadInitialEvents: (state, action) => {

            const {payload} = action;

            state.events = payload;
            state.filterEvents = payload;

        },

        onDelete: (state, action) => {
            const { payload } = action;
            const newEventList = state.events.filter((evt) => evt.id !== payload);
            state.events = newEventList;
            state.filterEvents = newEventList;
        },
        onAddEvent: (state, action) => {
            const { payload } = action;
            state.events = [...state.events, payload];
            state.filterEvents = state.events;

        },
        onFilter: (state, action) => {
            const { payload } = action;
            if (payload === "0") {
              state.filterEvents = state.events;
            } else if (payload === "1") {
              const newFilterList = state.events.filter((evt) =>  formatDateFromString(evt.fecha) === formatDate(new Date()));
              state.filterEvents = newFilterList;
            } else {
              const newFilterList = state.events.filter((evt) => formatDateFromString(evt.fecha) < formatDate(new Date()));
              state.filterEvents = newFilterList;
            }
        },

    },

});

export const {loadInitialEvents, onDelete, onFilter, onAddEvent} = eventsSlice.actions;

export const selectEvents = (state) => state.eventsSlice.events;
export const selectFilteredEvents = (state) => state.eventsSlice.filterEvents;

export default eventsSlice.reducer;