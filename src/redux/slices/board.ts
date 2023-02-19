import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";
import { RootState } from "../store";

interface BoardState {
    game: Chess;
 }

 const initialState: BoardState = {
    game: new Chess()
 }

 export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        drop: (state, action: PayloadAction<Chess>) => {
            state.game = action.payload
        }
    }
 })

 export const { drop } = boardSlice.actions

 // Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer