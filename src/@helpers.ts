import { LocalMove, DBMove } from "./@constants";

// export const safeGameMutate = (
//    game: Chess,
//    modify: (game: Chess) => void
// ): Chess => {
//    const newGame: Chess = new Chess()
//    game.history().forEach((move) => newGame.move(move));
//    modify(newGame);
//    return newGame;
// };

// export const safeGameMutateReturnMove = (
//    game: Chess,
//    modify: (game: Chess) => ChessMove
// ): { newGame: Chess, moveMade: ChessMove } => {
//    const newGame: Chess = new Chess()
//    game.history().forEach((move) => newGame.move(move));
//    const moveMade: ChessMove = modify(newGame);
//    return { newGame, moveMade };
// };

export const fetchPostionFromID = async (id: string): Promise<DBMove> => {
   return fetch(`/api/data/${id}`).then((res) => res.json());
};

export const fetchPostionFromFen = async (data: { user: string, fen: string }) => {
   return fetch("/api/data/find", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   }).then((res) => res.json())
}

export const removeMoveCountFromFen = (fen: string): string => {
   let countToDelete: number = 0;
   let whiteSpaceCount: number = 0;
   for (let i = fen.length - 1; i > 0; i--) {
      countToDelete++
      if (fen.charAt(i) == " ") whiteSpaceCount++
      if (whiteSpaceCount >= 2) break
   }
   return fen.slice(0, -countToDelete)
}

export async function postMove(data: Object) {
   return fetch("/api/data/root", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   }).then((res) => res.json());
}

export async function postMoves(unsavedMoveList: LocalMove[], user: string, userColor: string) {
   const data = {
      moves: unsavedMoveList,
      user: user,
      userColor: userColor == "white" ? "w" : "b"
   }
   let rootMove: DBMove;
   return await fetch("/api/data/save", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   }).then((res) => res.json())
}

// export async function getChildren(id: string): Promise<MoveData[]> {
//    let childData: MoveData[] = [];
//    await fetch(`/api/data/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//          childData = data.childData;
//       });
//    return childData;
// }

// export const getRandomNextMove = async (move: Move): Promise<Move> => {
//    const randomIndex = Math.floor(Math.random() * move.nextMoves.length);
//    return fetchMove(move.nextMoves[randomIndex]);
// };

// export const getBlackLearnStateFirstMove = async (
//    user: User
// ): Promise<Move | undefined> => {
//    const blackRoot: Move = await fetchMove(user.blackRootID);
//    if (blackRoot.childData.length === 0) {
//       alert("need saved black lines before learning");
//       return;
//    }
//    return getRandomNextMove(blackRoot);
// };

// export const getRootMove = async (
//    boardOrientation: Orientation,
//    user: User
// ): Promise<Move> => {
//    // return boardOrientation === Orientation.white
//    //    ? fetchMove(user.whiteRootID)
//    //    : fetchMove(user.blackRootID);
//    return fetchMove(user.rootID)
// };
