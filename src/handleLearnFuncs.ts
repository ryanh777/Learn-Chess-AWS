import { Move as ChessMove} from "chess.js";
import { Move, MoveData, Orientation } from "./@constants";
import { fetchMove } from "./@helpers";

const determineMoveForHandleLearn = async (orientation: Orientation, move?: ChessMove, prevMove?: Move): Promise<MoveData | undefined> => {
   console.log("prevMove", prevMove)
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

const getRandomInt = (max: number): number => {
   return Math.floor(Math.random() * max)
}

export default determineMoveForHandleLearn;