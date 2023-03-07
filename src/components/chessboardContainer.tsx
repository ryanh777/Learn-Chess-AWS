import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move as ChessMove, Square } from 'chess.js'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { makeMove, moveHadChild } from '../redux/slices/board';
import { fetchMove } from '../@helpers';
import { Move, Orientation } from '../@constants';

const ChessboardContainer = () => {
    const dispatch = useAppDispatch();
    const moves = useAppSelector((state) => state.board.moveData);
    const index = useAppSelector((state) => state.board.index);
    const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
    const prevMove = useAppSelector((state) => state.board.prevMove);
    const [game, setGame] = useState(new Chess());
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

    useEffect(() => {
        let newGame: Chess = new Chess()
        for (let i = 0; i < index + 1; i++) {
            newGame.move(moves[i].move)
        }
        setGame(newGame)
    }, [index])

    const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
        let attemptedMove: ChessMove | null = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });
        if (attemptedMove == null) return false;
        
        dispatch(makeMove({
            id: "",
            move: attemptedMove.san,
            piece: attemptedMove.color.concat(attemptedMove.piece),
            childData: []
        }))
        checkIfMoveHadChildren(attemptedMove);
        return true;
    }

    const checkIfMoveHadChildren = async (lastMove: ChessMove) => {
        let userMoveID: string = ""
        for (let i in prevMove.childData) {
            if (prevMove.childData[i].move === lastMove.san) {
                userMoveID = prevMove.childData[i].id
                break
            }
        }
        if (userMoveID != "") {
            const move: Move = await fetchMove(userMoveID)
            dispatch(moveHadChild(move))
        }
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

export default ChessboardContainer;