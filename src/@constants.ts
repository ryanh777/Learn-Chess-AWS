export interface User {
   username: string;
   whiteRootID: string;
   blackRootID: string;
}

export interface MoveData {
   id: string;
   move: string;
   piece: string;
}

export interface Move {
   id: string;
   move: string;
   piece: string;
   childData: MoveData[];
}

export interface MoveInfo {
   move: string,
   piece: string
}

export enum AppState {
   learn = "learn",
   create = "create",
}

export enum LearnFailState {
   incorrect,
   end
}

export enum Orientation {
   white = "white",
   black = "black",
}
