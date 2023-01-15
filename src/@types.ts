import { Chess } from "chess.js";
import { Orientation, User } from "./@constants";
import { Move } from "./@constants";

export type LoginStateType = {
   username: string;
   password: string;
   confirmpassword: string;
   error: string;
   isLoading: boolean;
   isLoggedIn: boolean;
};

export type LoginActionType =
   | { type: "field"; fieldName: string; payload: string }
   | { type: "login" }
   | { type: "success" }
   | { type: "error"; payload: string }
   | { type: "logout" };

export type LogicContextStateType = {
   user: User;
   game: Chess;
   boardOrientation: Orientation;
   prevMove: Move;
   isLearnState: boolean;
};

export type LogicContextActionType =
   | { type: "reset-state" }
   | { type: "drop"; payload: Chess }
   | { type: "update-game"; payload: { game: Chess; move: Move } }
   | { type: "update-prevMove"; payload: Move }
   | { type: "reset-board"; payload: Move }
   | { type: "flip"; payload: Move }
   | {
        type: "flip-black-learnstate";
        payload: { game: Chess; move: Move };
     }
   | { type: "mode"; payload: Move }
   | {
        type: "mode-black-learnstate";
        payload: { game: Chess; move: Move };
     }
   | { type: "auto-move"; payload: { game: Chess; move: Move } };
