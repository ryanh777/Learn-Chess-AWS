import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DBMove, LocalMove, Move, Orientation } from "../../@constants";
import { RootState } from "../store";

interface BoardState {
   moveList: LocalMove[];
   boardOrientation: Orientation;
   root: DBMove
   index: number;
   prevMove: LocalMove;
}

const initialState: BoardState = {
   moveList: [],
   boardOrientation: Orientation.white,
   root: {
      user: "",
      fen: "",
      nextMovesWhite: [],
      nextMovesBlack: []
   },
   index: -1,
   prevMove: {
      fen: "",
      move: "",
      piece: "",
      nextMoveList: [],
   }
}

export const boardSlice = createSlice({
   name: 'board',
   initialState,
   reducers: {
      makeMove: (state, action: PayloadAction<LocalMove>) => {
         if (state.index + 1 == state.moveList.length) {
            state.moveList.push(action.payload);
            state.index++;
            state.prevMove = state.moveList[state.index];
         }
         if (state.index + 1 < state.moveList.length) {
            if (state.moveList[state.index + 1] == action.payload) {
               state.index++;
               state.prevMove = state.moveList[state.index];
            } else {
               while (state.index + 1 < state.moveList.length) state.moveList.pop();
               state.moveList.push(action.payload);
               state.index++;
               state.prevMove = state.moveList[state.index];
            }
         }
      },
      reset: (state) => {
         state.moveList = [];
         state.index = -1;
         boardSlice.caseReducers.setPrevMoveToRoot(state);
      },
      flip: (state) => {
         if (state.boardOrientation == Orientation.white) {
            state.boardOrientation = Orientation.black;
         } else {
            state.boardOrientation = Orientation.white;
         }
         boardSlice.caseReducers.reset(state)
      },
      undo: (state) => {
         if (state.index > 0) {
            state.index--;
            state.prevMove = state.moveList[state.index];
         } else if (state.index == 0) {
            state.index--;
            boardSlice.caseReducers.setPrevMoveToRoot(state);
         }
      },
      redo: (state) => {
         if (state.index + 1 < state.moveList.length) {
            state.index++;
            state.prevMove = state.moveList[state.index]
         }
      },
      setRoot: (state, action: PayloadAction<DBMove>) => {
         state.root = action.payload;
         boardSlice.caseReducers.setPrevMoveToRoot(state);
         state.moveList = []
         state.index = -1
      },
      setIndex: (state, action: PayloadAction<number>) => {
         state.index = action.payload;
         state.prevMove = state.moveList[action.payload];
      },
      setPrevMoveToRoot: (state) => {
         const move: LocalMove = {
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
            move: "",
            piece: "",
            nextMoveList: state.boardOrientation == Orientation.white ?
               state.root.nextMovesWhite
               :
               state.root.nextMovesBlack
         }
         state.prevMove = move
      },
      removeMove: (state, action: PayloadAction<DBMove>) => {
         if (state.index == -1) state.root = action.payload
         const move: LocalMove = {
            fen: action.payload.fen,
            move: "",
            piece: "",
            nextMoveList: state.boardOrientation == Orientation.white ?
               action.payload.nextMovesWhite
               :
               action.payload.nextMovesBlack
         }
         if (state.index >= 0) state.moveList[state.index].nextMoveList = move.nextMoveList
         state.prevMove = move;
      },
      editPrevMove: (state, action: PayloadAction<DBMove>) => {
         const move: LocalMove = {
            fen: action.payload.fen,
            move: "",
            piece: "",
            nextMoveList: state.boardOrientation == Orientation.white ?
               action.payload.nextMovesWhite
               :
               action.payload.nextMovesBlack
         }
         state.prevMove = move
      }
   }
})

export const {
   makeMove,
   reset,
   flip,
   undo,
   redo,
   setRoot,
   setIndex,
   removeMove,
   editPrevMove
} = boardSlice.actions

export const selectBoard = (state: RootState) => state.board

export default boardSlice.reducer