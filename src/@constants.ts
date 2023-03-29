export interface User {
   username: string
   rootID: string
}

export interface NextMove {
   move: string
   piece: string
   numOfKids: number
}

export interface Move {
   id: string
   fen: string
   move: string
   piece: string
   nextMovesWhite: NextMove[]
   nextMovesBlack: NextMove[]
}

export interface DBMove {
   user: string
   fen: string
   nextMovesWhite: NextMove[]
   nextMovesBlack: NextMove[]
}

export interface LocalMove {
   fen: string
   move: string
   piece: string
   nextMoveList: NextMove[]
}

// export interface MoveData {
//    id: string
//    move: string
//    piece: string
// }

// export interface Move {
//    id: string;
//    move: string;
//    piece: string;
//    childData: MoveData[];
// }

// export interface SavedMove {
//    user: string;
//    move: string;
//    piece: string;
// }

// export interface MoveInfo {
//    move: string,
//    piece: string
// }

export enum AppState {
   learn = "learn",
   create = "create",
}

export enum LearnFailState {
   incorrect,
   end,
}

export enum Orientation {
   white = "white",
   black = "black",
}
