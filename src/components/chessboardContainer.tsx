import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move as ChessMove, Square } from 'chess.js'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { makeMove, moveHadChild } from '../redux/slices/board';
import { fetchMove, safeGameMutate, safeGameMutateReturnMove } from '../@helpers';
import { AppState, Move, MoveData, Orientation } from '../@constants';
import determineMoveForHandleLearn from '../handleLearnFuncs';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const ChessboardContainer = (props: props) => {
   const dispatch = useAppDispatch();
   const moves = useAppSelector((state) => state.board.moveData);
   const index = useAppSelector((state) => state.board.index);
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   // const prevMove = useAppSelector((state) => state.board.prevMove);
   const [prevMove, setPrevMove] = useState<Move>(useAppSelector((state) => state.board.prevMove))
   const appState = useAppSelector((state) => state.app.appState);
   // const [game, setGame] = useState(new Chess());
   const [lastGameMove, setLastGameMove] = useState<ChessMove | undefined>()
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

   // useEffect(() => {
   //    if (index == -1) {
   //       // setGame(constructNewGame())
   //       setGame(new Chess())
   //    }
   // }, [index])

   // useEffect(() => {
   //    if (!lastGameMove) return;
   //    movePiece(lastGameMove.san, lastGameMove.color.concat(lastGameMove.piece));
   //    if (appState == AppState.Learn) {
   //       handleLearn(lastGameMove);
   //       return;
   //    }
   //    console.log('here')
   // }, [game])

   // const constructNewGame = (): Chess => {
   //    let newGame: Chess = new Chess()
   //    for (let i = 0; i < index + 1; i++) {
   //       newGame.move(moves[i].move)
   //    }
   //    return newGame;
   // }

   const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
      // let tempGame: Chess = new Chess();
      // let attemptedMove: ChessMove | null = tempGame.move({
      //    // let attemptedMove: ChessMove | null = props.game.move({
      //    from: sourceSquare,
      //    to: targetSquare,
      //    promotion: "q"
      // });
      // if (attemptedMove === null) { console.log('bad'); return false; }

      // const newChessGame: Chess = safeGameMutate(props.game, (game) => {
      //    game.move({
      //       from: sourceSquare,
      //       to: targetSquare,
      //       promotion: "q"
      //    })
      // })

      // props.setGame(newChessGame)
      let move: ChessMove | undefined;
      try {
         const gameData: { newGame: Chess, moveMade: ChessMove } =
            safeGameMutateReturnMove(props.game, (game): ChessMove => {
               return game.move({
                  from: sourceSquare,
                  to: targetSquare,
                  promotion: "q"
               })
            })
         props.setGame(gameData.newGame);
         move = gameData.moveMade;
      // invalid moves return errors
      } catch { return false }

      if (!move) return false;


      updateReduxWithMove(move.san, move.color.concat(move.piece))
      // can't get below to rerender on set
      // props.setGame(attemptedMove);
      // safeGameMutate seems to work
      // props.setGame(safeGameMutate(props.game, (game) => {
      //    // not sure how attemptedMove can still be null
      //    game.move(attemptedMove!.san);
      // }))

      // setLastGameMove(attemptedMove);

      // if (appState == AppState.Learn) {
      //    handleLearn(attemptedMove);
      //    return true;
      // }
      // movePiece(attemptedMove.san, attemptedMove.color.concat(attemptedMove.piece));


      // setLastGameMove(attemptedMove);
      return true;
   }

   const updateReduxWithMove = async (move: string, piece: string) => {
      const fullMove: Move | undefined = await checkIfMoveIsChildOfPrev(move);
      if (fullMove) {
         dispatch(makeMove(fullMove))
         setPrevMove(fullMove);
      } else {
         dispatch(makeMove({
            id: "",
            move: move,
            piece: piece,
            childData: []
         }));
      }
   }

   // const movePieceAndCheckForChildren = (move: ChessMove) => {
   //    dispatch(makeMove({
   //       id: "",
   //       move: move.san,
   //       piece: move.color.concat(move.piece),
   //       childData: []
   //    }));
   //    checkIfMoveHadChildren(move);
   // }

   const checkIfMoveIsChildOfPrev = async (lastMove: string): Promise<Move | undefined> => {
   //   let userMoveID: string = ""
      for (let i in prevMove.childData) {
         if (prevMove.childData[i].move === lastMove) {
            return await fetchMove(prevMove.childData[i].id)
            // dispatch(moveHadChild(move))
            // setPrevMove(move);
            //  userMoveID = prevMove.childData[i].id
            //  break
         }
      }
   //   if (userMoveID != "") {
   //       const move: Move = await fetchMove(userMoveID)
   //       dispatch(moveHadChild(move))
   //   }
   }

   // const handleLearn = async (move: ChessMove) => {
   //    const autoMove: MoveData | undefined = await determineMoveForHandleLearn(boardOrientation, move, prevMove)
   //    if (!autoMove) {console.log("undefined"); return;}
   //    movePiece(autoMove.move, autoMove.piece);
   //    // const tempGame: Chess = constructNewGame();
   //    // tempGame.move(autoMove.move);
   //    game.move(autoMove.move)
   //    setLastGameMove(undefined);
   //    setGame(game)
   //    setTimeout(() => movePiece(autoMove.move, autoMove.piece), 200);
   // }

   // const createPieceStringFromChessMove = (move: ChessMove | MoveData): string => {
   //    if (typeof move === ChessMove) {

   //    }
   //    move.color.concat(move.piece);
   // }

   return (
      <div className='mx-6'>
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