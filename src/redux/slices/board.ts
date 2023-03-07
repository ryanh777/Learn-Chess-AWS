import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Move, MoveData, Orientation } from "../../@constants";
import { RootState } from "../store";

interface BoardState {
    moveData: Move[];
    boardOrientation: Orientation;
    whiteRoot: Move;
    blackRoot: Move;
    index: number;
    prevMove: Move;
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
    index: -1,
    prevMove: {
        id: "",
        move: "",
        piece: "",
        childData: []
    }
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<Move>) => {
            if (state.index + 1 == state.moveData.length) {   
                state.moveData.push(action.payload);
                state.index++;
                state.prevMove = state.moveData[state.index];
            }
            if (state.index + 1 < state.moveData.length) {
                if (state.moveData[state.index + 1] == action.payload) {
                    state.index++;
                    state.prevMove = state.moveData[state.index];
            } else {
                    while(state.index + 1 < state.moveData.length) state.moveData.pop();
                    state.moveData.push(action.payload);
                    state.index++;
                    state.prevMove = state.moveData[state.index];
            }
            }
        },
        reset: (state) => {
            state.moveData = [];
            state.index = -1;
            if (state.boardOrientation == Orientation.white) {
                state.prevMove = state.whiteRoot;
            } else {
                state.prevMove = state.blackRoot;
            }
        },
        flip: (state) => {
            state.moveData = [];
            state.index = -1;
            if (state.boardOrientation == Orientation.white) {
                state.boardOrientation = Orientation.black;
                state.prevMove = state.blackRoot;
            } else {
                state.boardOrientation = Orientation.white;
                state.prevMove = state.whiteRoot;
            }
        },
        undo: (state) => {
            if (state.index > 0) {
                state.index--;
                state.prevMove = state.moveData[state.index];
            } else if (state.index == 0) {
                state.index--;
                if (state.boardOrientation == Orientation.white) {
                    state.prevMove = state.whiteRoot;
                } else {
                    state.prevMove = state.blackRoot;
                }
            }
        },
        redo: (state) => {
            if (state.index + 1 < state.moveData.length) {
                state.index++;
                state.prevMove = state.moveData[state.index];
            }
        },
        resetAndSetWhiteRootMove: (state, action: PayloadAction<Move>) => {
            state.moveData = [];
            state.index = -1;
            state.whiteRoot = action.payload;
        },
        resetAndSetBlackRootMove: (state, action: PayloadAction<Move>) => {
            state.moveData = [];
            state.index = -1;
            state.blackRoot = action.payload;
        },
        moveHadChild: (state, action: PayloadAction<Move>) => {
            state.moveData[state.index] = action.payload;
            state.prevMove = action.payload;
        },
        setIndex: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
            state.prevMove = state.moveData[action.payload];
        },
        setPrevMoveToRoot: (state) => {
            if (state.boardOrientation == Orientation.white) {
                state.prevMove = state.whiteRoot
            } else {
                state.prevMove = state.blackRoot
            }
        }
    }
})

export const { makeMove, reset, flip, undo, redo, resetAndSetWhiteRootMove, resetAndSetBlackRootMove, moveHadChild, setIndex, setPrevMoveToRoot } = boardSlice.actions

export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer