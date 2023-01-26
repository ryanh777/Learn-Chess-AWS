import { Children, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import { Square, Chess} from 'chess.js'
// import { Chessboard } from "react-chessboard";
import LogicContext from '../LogicContext';
import { fetchMove, getBlackLearnStateFirstMove, getRandomNextMove, getRootMove, safeGameMutate } from '../@helpers';
import { Orientation, Move } from '../@constants';
import { Chessboard } from 'react-chessboard';

// interface Props {
//    userDidMove: MutableRefObject<boolean>
// }

const ChessboardContainer = () => {
   const { state, dispatch } = useContext(LogicContext)
   const { user, game, boardOrientation, isLearnState, prevMove } = state
   const [boardWidth, setBoardWidth] = useState<number>(Math.min(window.innerHeight, window.innerWidth) * .95)

   const setBW = () => {
      // console.log("height: ", window.innerHeight)
      // console.log("width: ", window.innerWidth)
      console.log("boardWdith:", boardWidth)
      setBoardWidth(Math.min(window.innerHeight, window.innerWidth) * .95)
   }

   useEffect(() => {
      window.addEventListener('resize', setBW)
     return () => {
      window.removeEventListener('resize', setBW)
     }
   }, [])

   const gameHasChanged = async () => { 
      const moveList: string[] = game.history()
      if (isLearnState) {
         if (moveList.length === 0) return
         const lastMove: string= moveList[moveList.length - 1]
			let userMoveID: string = ""
			for (let i in prevMove.childData) {
				if (prevMove.childData[i].move === lastMove) {
					userMoveID = prevMove.childData[i].id
					break
				}
			}
			if (userMoveID === "") {
				endOfLine("incorrect move")
				return
			}
         const userMove: Move = await fetchMove(userMoveID)
			if (!userMove.childData.length) {
				endOfLine("nice job")
				return
			}
			const oppMove: Move = await getRandomNextMove(userMove)
			if (!oppMove.childData.length) {
				endOfLine("nice job")
				return
			}
         dispatch({type: "auto-move", payload: {
               game: safeGameMutate(game, (game) => { 
                  game.move(oppMove.move)
               }), 
               move: oppMove
            }
         })
         return
      }
      const lastMove: string = moveList[moveList.length - 1]
      let userMoveID: string = ""
      for (let i in prevMove.childData) {
         if (prevMove.childData[i].move === lastMove) {
            userMoveID = prevMove.childData[i].id
            break
         }
      }
      if (userMoveID === "") {
         const move: Move = {
            move: lastMove,
            parentID: "",
            piece: "",
            childData: []
         }
         dispatch({type: "update-prevMove", payload: move})
         return
      }
      const move: Move = await fetchMove(userMoveID)
      dispatch({type: "update-prevMove", payload: move})
   }

   const endOfLine = async (message: string) => {
		alert(message)
      if (boardOrientation === Orientation.black) {
         const firstMove: Move | undefined = await getBlackLearnStateFirstMove(user)
         if (firstMove) {
            dispatch({
               type: "update-game",
               payload: {
                  game: safeGameMutate(
                     game,
                     (game) => {
                        game.reset()
                        game.move(firstMove.move)
                     }
                  ),
                  move: firstMove
               }
            })
         }
         return
      }
      const rootMove: Move = await getRootMove(boardOrientation, user)
      dispatch({type: "reset-board", payload: rootMove})
   }

   const onDrop = (sourceSquare: Square, targetSquare: Square) => { 
      let move = null;
      dispatch({ 
         type: "drop", 
         payload: safeGameMutate(game, (game) => {
            move = game.move({
               from: sourceSquare,
               to: targetSquare,
               promotion: "q"
            });
         }),
      })
      if (move === null) return false; // illegal move
      setTimeout(gameHasChanged, 200)
      return true;
   }

   return (
      <div className='mx-6'>
         <Chessboard 
            boardWidth={boardWidth} 
            boardOrientation={boardOrientation} 
            position={game.fen()} 
            onPieceDrop={onDrop}
            customDarkSquareStyle={{backgroundColor: '#769656'}}
            customLightSquareStyle={{backgroundColor: '#eeeed2'}}
            customBoardStyle={{borderRadius: '5px'}}
         />
      </div>
   )
}

export default ChessboardContainer