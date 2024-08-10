import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "../../Helpers/localStorage";

const userData = getFromLocalStorage("userData");

const userSlice = createSlice({

    name: "userSlice",
    initialState: {
        userLogged: userData,
    },
    reducers: {

        loginUser: (state,action) => {
            
            const {payload} = action;
            state.userLogged = payload;
            setToLocalStorage("userData", payload);
        },

        logoutUser: (state) => {

            state.userLogged = null;
            removeFromLocalStorage("userData");

        },

        registerUser: (state, action) => {

            const {payload} = action;
            state.userLogged = payload;
            setToLocalStorage("userData", payload);

        }

    },

});

export const {loginUser, logoutUser, registerUser} = userSlice.actions;
export const selectUserLogged = (state) => state.userSlice.userLogged;
export default userSlice.reducer;