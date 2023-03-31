import { DBMove, LearnFailState, LocalMove, NextMove } from "./@constants";
import { fetchPostionFromFen } from "./@helpers";

export const determineMoveForHandleLearn = async (prevMove: LocalMove, move: string, username: string, userColor: string): Promise<string | LearnFailState>=> {
   if (prevMove.nextMoveList.length == 0) return LearnFailState.end;
   
   let matchedMove: NextMove | undefined;
   prevMove.nextMoveList.forEach((nextMove) => {
      if (move == nextMove.move) matchedMove = nextMove;
   })
   if (!matchedMove) return LearnFailState.incorrect;

   const completeMatchedMove: DBMove = await fetchPostionFromFen({ user: username, fen: matchedMove.fen })
   if (!completeMatchedMove) return LearnFailState.end
   const potentialOpponentMoves: NextMove[] = userColor == "white" ? 
      completeMatchedMove.nextMovesWhite : completeMatchedMove.nextMovesBlack
   const randomKidFen: string = potentialOpponentMoves[pickWeightedRandomIndex(potentialOpponentMoves)].fen
   const completeRandomKidMove: DBMove = await fetchPostionFromFen({ user: username, fen: randomKidFen })
   if (!completeRandomKidMove) return LearnFailState.end
   return randomKidFen
}

// picks random weighted index based on numOfKids count
export const pickWeightedRandomIndex = (moveList: NextMove[]): number => {
   let totalKids: number = 0
   let cumulativeWeights: number[] = []
   moveList.forEach((move) => {
      totalKids = totalKids + move.numOfKids
      cumulativeWeights.push(totalKids)
   })
   const randomNum: number = Math.random() * totalKids
   for (let i = 0; i < cumulativeWeights.length; i++) {
      if (cumulativeWeights[i] > randomNum) return i
   }
   return moveList.length - 1
}
