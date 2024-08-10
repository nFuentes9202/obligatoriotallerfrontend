import { createSlice } from "@reduxjs/toolkit";

const categoriasSlice = createSlice({

    name: "categoriasSlice",
    initialState: {
        categorias: [],
    },
    reducers: {

        loadInitialCategorias: (state, action) => {

            const {payload} = action;

            state.categorias = payload;

        },

    },

});

export const {loadInitialCategorias} = categoriasSlice.actions;

export const selectCategorias = (state) => state.categoriasSlice.categorias;

export default categoriasSlice.reducer;