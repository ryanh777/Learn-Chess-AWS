import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move as ChessMove, Square } from 'chess.js'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { makeMove, reset } from '../redux/slices/board';
import { fetchPostionFromFen, removeMoveCountFromFen, } from '../@helpers';
import { AppState, LearnFailState, Move, Orientation } from '../@constants';
// import { determineMoveForHandleLearn, getMoveIfChildOfPrev } from '../handleLearnFuncs';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const ChessboardContainer = (props: props) => {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.user)
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   const prevMove = useAppSelector((state) => state.board.prevMove)
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
      const move = newGame.move({
         from: sourceSquare,
         to: targetSquare,
         promotion: "q"
      })
      props.setGame(newGame)

      // let gameData: { newGame: Chess, moveMade: ChessMove } | undefined;
      // try {
      //    gameData = safeGameMutateReturnMove(props.game, (game): ChessMove => {
      //       return game.move({
      //          from: sourceSquare,
      //          to: targetSquare,
      //          promotion: "q"
      //       })
      //    })
      //    props.setGame(gameData.newGame);
      //    // invalid moves return errors
      // } catch { return false }
      // if (!gameData) return false;

      // const move = gameData.moveMade;
      // if (appState == AppState.learn) {
      //    handleLearn(gameData.newGame, move);
      //    return true;
      // }
      updateReduxWithMove(oldGameFen, newGame.fen(), move.san, move.color.concat(move.piece))
      return true;
   }

   // const handleLearn = async (game: Chess, move: ChessMove) => {
   //    const autoMove: MoveData | LearnFailState = await determineMoveForHandleLearn(move, prevMove)

   //    if (autoMove == LearnFailState.end) { 
   //       setTimeout(() => {
   //          props.setGame(new Chess())
   //       }, 1000);
   //       dispatch(reset())
   //       return; 
   //    }
   //    if (autoMove == LearnFailState.incorrect) { 
   //       setTimeout(() => {
   //          props.setGame(safeGameMutate(game, (game) => {
   //             game.undo();
   //          }))
   //       }, 600);
   //       return; 
   //    }
   //    if (!autoMove) { console.log("undefined"); return; }

   //    setTimeout(() => {
   //       props.setGame(safeGameMutate(game, (game) => {
   //          game.move(autoMove.move);
   //       }))
   //    }, 200)

   //    const fetchedFirstMove = await updateReduxWithMove(move.san, move.color.concat(move.piece), prevMove)
   //    if (!fetchedFirstMove) return;
   //    await updateReduxWithMove(autoMove.move, autoMove.piece, fetchedFirstMove);
   // }

   const updateReduxWithMove = async (oldFen: string, newFen: string, move: string, piece: string): Promise<Move | undefined> => {
      const editedFen: string = removeMoveCountFromFen(newFen)
      const savedPosition: Move | undefined = await fetchPostionFromFen({ user: user.username, fen: editedFen })

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