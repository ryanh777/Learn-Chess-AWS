import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LoginStateType {
    username: string;
    password: string;
    confirmpassword: string;
    error: string;
    isLoading: boolean;
    isLoggedIn: boolean;
 };

 const initialState: LoginStateType = {
    username: "ryan",
    password: "",
    confirmpassword: "",
    error: "",
    isLoading: false,
    isLoggedIn: false,
 }

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        success: (state) => {
            state.isLoggedIn = true
        }
    }
})

export const { success } = loginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state: RootState) => state.login

export default loginSlice.reducer