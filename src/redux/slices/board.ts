import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Move, MoveData, Orientation } from "../../@constants";
import { RootState } from "../store";

interface BoardState {
    moveData: MoveData[];
    boardOrientation: Orientation;
    prevMove: Move;
}

const initialState: BoardState = {
    moveData: [],
    boardOrientation: Orientation.white,
    prevMove: {
        move: "",
        parentID: "",
        piece: "",
        childData: [],
    }
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        drop: (state, action: PayloadAction<MoveData>) => {
            state.moveData.push(action.payload);
        },
        reset: (state, action: PayloadAction<Move>) => {
            state.moveData = [];
            state.prevMove = action.payload;
        },
        flip: (state, action: PayloadAction<Move>) => {
            state.moveData = [];
            state.prevMove = action.payload;
            state.boardOrientation == Orientation.white ? 
                state.boardOrientation = Orientation.black : state.boardOrientation = Orientation.white 
        },
        undo: (state, action: PayloadAction<Move>) => {
            state.moveData.pop();
            state.prevMove = action.payload;
        },
        setPrevMove: (state, action: PayloadAction<Move>) => {
            state.prevMove = action.payload;
        },
        updateGame: (state, action: PayloadAction<{moveData: MoveData, prevMove: Move}>) => {
            state.moveData.push(action.payload.moveData);
            state.prevMove = action.payload.prevMove;
        }
    }
})

export const { drop, reset, flip, undo, setPrevMove, updateGame } = boardSlice.actions

export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer