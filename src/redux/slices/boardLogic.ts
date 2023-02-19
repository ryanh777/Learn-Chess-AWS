import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chess } from "chess.js";
import { RootState } from "../store";

interface LogicState {
    game: Chess;
 }

 const initialState: LogicState = {
    game: new Chess()
 }

 export const logicSlice = createSlice({
    name: 'logic',
    initialState,
    reducers: {
        drop: (state, action: PayloadAction<Chess>) => {
            state.game = action.payload
        }
    }
 })

 export const { drop } = logicSlice.actions

 // Other code such as selectors can use the imported `RootState` type
export const selectLogic = (state: RootState) => state.logic

export default logicSlice.reducer