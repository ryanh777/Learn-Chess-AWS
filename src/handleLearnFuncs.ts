import { Move as ChessMove} from "chess.js";
import { Move, MoveData, Orientation } from "./@constants";
import { fetchMove } from "./@helpers";

export const determineMoveForHandleLearn = async (orientation: Orientation, move?: ChessMove, prevMove?: Move): Promise<MoveData | undefined> => {
   if (!move && orientation == Orientation.black) {
      console.log("move a piece")
      return;
   }
   if (!move || !prevMove) return;
   let matchedMove: MoveData | undefined;
   prevMove.childData.forEach((child) => {
      if (move.san == child.move) matchedMove = child;
   })
   if (!matchedMove) return;
   const completeMatchedMove: Move = await fetchMove(matchedMove.id);
   return completeMatchedMove.childData[getRandomInt(completeMatchedMove.childData.length)]
}

export const getMoveIfChildOfPrev = async (move: string, prevMove: Move): Promise<Move | undefined> => {
   for (let i in prevMove.childData) {
      if (prevMove.childData[i].move === move) {
         return await fetchMove(prevMove.childData[i].id)
      }
   }
}

const getRandomInt = (max: number): number => {
   return Math.floor(Math.random() * max)
}
