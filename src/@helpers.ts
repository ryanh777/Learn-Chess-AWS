import { Chess } from "chess.js";
import { Move, Orientation, User } from "./@constants";
import { LogicContextActionType } from "./@types";

export const safeGameMutate = (
   game: Chess,
   modify: (game: Chess) => void
): Chess => {
   const update: Chess = Object.create(game);
   modify(update);
   return update;
};

export const fetchMove = async (id: string): Promise<Move> => {
   return fetch(`/data/${id}`).then((res) => res.json());
};

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

export const undo = async (
   count: number,
   game: Chess,
   prevMove: Move,
   dispatch: (value: LogicContextActionType) => void
): Promise<void> => {
   // const moveBeforeLast: Move = await fetchMove(prevMove.parentID)
   let lastMove: Move = await fetchMove(prevMove.parentID);
   for (let i = 0; i < count - 1; i++)
      lastMove = await fetchMove(lastMove.parentID);

   dispatch({
      type: "update-game",
      payload: {
         game: safeGameMutate(game, (game) => {
            for (let i = 0; i < count; i++) game.undo();
         }),
         move: lastMove,
      },
   });
};
