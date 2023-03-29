import { Move as ChessMove} from "chess.js";
import { LearnFailState, Move } from "./@constants";
import { fetchMove } from "./@helpers";

// export const determineMoveForHandleLearn = async (move: ChessMove, prevMove: Move): Promise<MoveData | LearnFailState> => {
//    if (prevMove.childData.length == 0) return LearnFailState.end;

//    let matchedMove: MoveData | undefined;
//    prevMove.childData.forEach((child) => {
//       if (move.san == child.move) matchedMove = child;
//    })
//    if (!matchedMove) return LearnFailState.incorrect;

//    const completeMatchedMove: Move = await fetchMove(matchedMove.id);
//    const childData: MoveData[] = completeMatchedMove.childData;
//    if (childData.length == 0) return LearnFailState.end;
//    const randomChildMove: MoveData = childData[getRandomInt(childData.length)]
//    const completeRandomChildMove = await fetchMove(randomChildMove.id);
//    if (completeRandomChildMove.childData.length == 0) return LearnFailState.end;
//    return randomChildMove;
// }

// export const getMoveIfChildOfPrev = async (move: string, prevMove: Move): Promise<Move | undefined> => {
//    for (let i in prevMove.nextMoves) {
//       if (prevMove.nextMoves[i].move === move) {
//          return await fetchMove(prevMove.childData[i].id)
//       }
//    }
// }

export const getRandomInt = (max: number): number => {
   return Math.floor(Math.random() * max)
}
