import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";
import { RootState } from "../store";

interface BoardState {
    moves: string[];
 }

 const initialState: BoardState = {
    moves: []
 }

 export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        drop: (state, action: PayloadAction<string>) => {
            state.moves.push(action.payload);
        }
    }
 })

 export const { drop } = boardSlice.actions

 // Other code such as selectors can use the imported `RootState` type
export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer