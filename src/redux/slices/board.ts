import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Move, MoveData, Orientation } from "../../@constants";
import { RootState } from "../store";

interface BoardState {
    moveData: Move[];
    boardOrientation: Orientation;
    whiteRoot: Move;
    blackRoot: Move;
    index: number;
}

const initialState: BoardState = {
    moveData: [],
    boardOrientation: Orientation.white,
    whiteRoot: {
        id: "",
        move: "",
        piece: "",
        childData: []
    },
    blackRoot: {
        id: "",
        move: "",
        piece: "",
        childData: []
    },
    index: -1
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<Move>) => {
            if (state.index + 1 == state.moveData.length) {   
                state.moveData.push(action.payload);
                state.index++;
            }
            if (state.index + 1 < state.moveData.length) {
                if (state.moveData[state.index + 1] == action.payload) {
                    state.index++;
                } else {
                    while(state.index + 1 < state.moveData.length) state.moveData.pop();
                    state.moveData.push(action.payload);
                    state.index++;
                }
            }
        },
        reset: (state) => {
            state.moveData = [];
            state.index = -1;
        },
        flip: (state) => {
            state.moveData = [];
            state.index = -1;
            state.boardOrientation == Orientation.white ? 
                state.boardOrientation = Orientation.black : state.boardOrientation = Orientation.white 
        },
        undo: (state) => {
            if (state.index > -1) state.index--;
        },
        redo: (state) => {
            if (state.index + 1 < state.moveData.length) state.index++;
        },
        setWhiteRootMove: (state, action: PayloadAction<Move>) => {
            state.whiteRoot = action.payload;
        },
        setBlackRootMove: (state, action: PayloadAction<Move>) => {
            state.blackRoot = action.payload;
        },
        moveHadChild: (state, action: PayloadAction<Move>) => {
            state.moveData[state.index] = action.payload;
        }
    }
})

export const { makeMove, reset, flip, undo, redo, setWhiteRootMove, setBlackRootMove, moveHadChild } = boardSlice.actions

export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer