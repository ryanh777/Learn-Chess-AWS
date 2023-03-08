import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MovesStateType {
    deleteActive: boolean;
};

const initialState: MovesStateType = {
    deleteActive: false
}

export const movesSlice = createSlice({
    name: 'moves',
    initialState,
    reducers: {
        flipDeleteState: (state) => {
            state.deleteActive = !state.deleteActive;
        }
    }
})

export const { flipDeleteState } = movesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state: RootState) => state.moves

export default movesSlice.reducer