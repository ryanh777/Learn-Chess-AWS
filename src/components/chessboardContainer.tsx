import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move as ChessMove, Square } from 'chess.js'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { editPrevMove, makeMove, reset } from '../redux/slices/board';
import { fetchPostionFromFen, removeMoveCountFromFen, } from '../@helpers';
import { AppState, DBMove, LearnFailState, NextMove } from '../@constants';
import { determineMoveForHandleLearn, pickWeightedRandomIndex } from '../handleLearnFuncs';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const ChessboardContainer = (props: props) => {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.user)
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   const prevMove = useAppSelector((state) => state.board.prevMove)
   const rootMove = useAppSelector((state) => state.board.root)
   const appState = useAppSelector((state) => state.app.appState);
   const [boardWidth, setBoardWidth] = useState<number>(Math.min(window.innerHeight, window.innerWidth) * .95)

   const setBW = () => {
      setBoardWidth(Math.min(window.innerHeight, window.innerWidth) * .95)
   }

   useEffect(() => {
      window.addEventListener('resize', setBW)
      return () => {
         window.removeEventListener('resize', setBW)
      }
   }, [])

   const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
      const oldGameFen = props.game.fen()
      const newGame = new Chess(oldGameFen)
      let move: ChessMove | undefined;
      try {

         move = newGame.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
         })
         props.setGame(newGame)
         // ignore invalid moves
      } catch { return false }
      if (!move) return false

      if (appState == AppState.learn) {
         handleLearn(newGame, move.san);
         return true;
      }
      updateReduxWithMove(newGame.fen(), move.san, move.color.concat(move.piece))
      return true;
   }

   const handleLearn = async (game: Chess, move: string) => {
      const autoMove = await determineMoveForHandleLearn(prevMove, move, user.username, boardOrientation)
      if (autoMove == LearnFailState.end) {
         setTimeout(async () => {
            props.setGame(new Chess())
            if (boardOrientation == "black") {
               const randomStartingMove: NextMove = rootMove.nextMovesBlack[pickWeightedRandomIndex(rootMove.nextMovesBlack)]
               const completeRandomMove: DBMove = await fetchPostionFromFen({ user: user.username, fen: randomStartingMove.fen })
               setTimeout(() => {
                  props.setGame(new Chess(randomStartingMove.fen))
                  dispatch(editPrevMove(completeRandomMove))
               }, 700)
            } else {
               dispatch(reset())
            }
         }, 1000)
         return;
      }
      if (autoMove == LearnFailState.incorrect) {
         setTimeout(() => {
            props.setGame(new Chess(prevMove.fen))
         }, 600);
         return;
      }
      if (typeof autoMove !== "string") { console.log("undefined"); return; }

      setTimeout(() => {
         props.setGame(new Chess(autoMove))
      }, 200)

      dispatch(editPrevMove(await fetchPostionFromFen({ user: user.username, fen: autoMove })))
   }

   const updateReduxWithMove = async (newFen: string, move: string, piece: string): Promise<DBMove | undefined> => {
      const editedFen: string = removeMoveCountFromFen(newFen)
      const savedPosition: DBMove | undefined = await fetchPostionFromFen({ user: user.username, fen: editedFen })

      if (savedPosition) {
         dispatch(makeMove({
            fen: editedFen,
            move: move,
            piece: piece,
            nextMoveList: boardOrientation == "white" ? savedPosition.nextMovesWhite : savedPosition.nextMovesBlack
         }))
         return savedPosition;
      } else {
         dispatch(makeMove({
            fen: editedFen,
            move: move,
            piece: piece,
            nextMoveList: [],
         }));
      }
      return
   }

   return (
      <div>
         <Chessboard
            boardWidth={boardWidth}
            boardOrientation={boardOrientation}
            position={props.game.fen()}
            onPieceDrop={onDrop}
            customDarkSquareStyle={{ backgroundColor: '#769656' }}
            customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
            customBoardStyle={{ borderRadius: '5px' }}
         />
      </div>
   )
}

export default ChessboardContainer;