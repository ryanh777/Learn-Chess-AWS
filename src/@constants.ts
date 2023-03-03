export interface User {
   username: string;
   whiteRootID: string;
   blackRootID: string;
}

export interface Move {
   move: string;
   parentID: string;
   piece: string;
   childData: {
      id: string;
      move: string;
      piece: string;
   }[];
}

export interface MoveInfo {
   move: string,
   piece: string
}

export enum AppState {
   Learn = "learn",
   Create = "create",
}

export enum Orientation {
   white = "white",
   black = "black",
}

export interface ChildData {
   id: string;
   move: string;
   piece: string;
}
