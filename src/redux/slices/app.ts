import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../@constants";
import { RootState } from "../store";

interface AppStateType {
    deleteActive: boolean;
    appState: AppState;
};

const initialState: AppStateType = {
    deleteActive: false,
    appState: AppState.Create
}

export const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      flipDeleteState: (state) => {
         state.deleteActive = !state.deleteActive;
      },
      setAppState: (state, action: PayloadAction<AppState>) => {
         state.appState = action.payload;
      }
   }
})

export const { flipDeleteState, setAppState } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state: RootState) => state.app

export default appSlice.reducer