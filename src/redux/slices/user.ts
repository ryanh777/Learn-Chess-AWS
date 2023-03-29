import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../@constants";
import { RootState } from "../store";

interface UserStateType {
   username: string;
   rootID: string;
   isLoggedIn: boolean;
};

const initialState: UserStateType = {
   username: "",
   rootID: "",
   isLoggedIn: false,
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<User>) => {
         state.username = action.payload.username;
         state.rootID = action.payload.rootID;
         state.isLoggedIn = true;
      }
   }
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state: RootState) => state.user

export default userSlice.reducer