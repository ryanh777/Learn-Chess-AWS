import { Chess, Move as ChessMove } from "chess.js";
import { MoveData, Move, Orientation, User } from "./@constants";

export const safeGameMutate = (
   game: Chess,
   modify: (game: Chess) => void
): Chess => {
   const newGame: Chess = new Chess()
   game.history().forEach((move) => newGame.move(move));
   modify(newGame);
   return newGame;
};

export const safeGameMutateReturnMove = (
   game: Chess,
   modify: (game: Chess) => ChessMove
): { newGame: Chess, moveMade: ChessMove } => {
   const newGame: Chess = new Chess()
   game.history().forEach((move) => newGame.move(move));
   const moveMade: ChessMove = modify(newGame);
   return {newGame, moveMade};
};

export const fetchMove = async (id: string): Promise<Move> => {
   return fetch(`/api/data/${id}`).then((res) => res.json());
};

export async function postMove(data: Object) {
   return fetch("/api/data/", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   }).then((res) => res.json());
}

export async function getChildren(id: string): Promise<MoveData[]> {
   let childData: MoveData[] = [];
   await fetch(`/api/data/${id}`)
      .then((res) => res.json())
      .then((data) => {
         childData = data.childData;
      });
   return childData;
}

export const getRandomNextMove = async (move: Move): Promise<Move> => {
   const randomIndex = Math.floor(Math.random() * move.childData.length);
   return fetchMove(move.childData[randomIndex].id);
};

export const getBlackLearnStateFirstMove = async (
   user: User
): Promise<Move | undefined> => {
   const blackRoot: Move = await fetchMove(user.blackRootID);
   if (blackRoot.childData.length === 0) {
      alert("need saved black lines before learning");
      return;
   }
   return getRandomNextMove(blackRoot);
};

export const getRootMove = async (
   boardOrientation: Orientation,
   user: User
): Promise<Move> => {
   return boardOrientation === Orientation.white
      ? fetchMove(user.whiteRootID)
      : fetchMove(user.blackRootID);
};
