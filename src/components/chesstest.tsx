import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move, Square } from 'chess.js'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { drop } from '../redux/slices/board';

const ChessTest = () => {
    const moves = useAppSelector((state) => state.board.moves);
    const [game, setGame] = useState(new Chess());
    const dispatch = useAppDispatch();
    const [boardWidth, setBoardWidth] = useState<number>(Math.min(window.innerHeight, window.innerWidth) * .85)

    const setBW = () => {
        setBoardWidth(Math.min(window.innerHeight, window.innerWidth) * .85)
    }
  
    useEffect(() => {
        window.addEventListener('resize', setBW)
        return () => {
            window.removeEventListener('resize', setBW)
        }
    }, [])

    useEffect(() => {
        let newGame: Chess = new Chess()
        moves.forEach((move) => {
            newGame.move(move);
        })
        setGame(newGame)
    }, [moves])

    const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
        let move: Move | null = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });
        if (move == null) return false;
        dispatch(drop(move.san))
        return true;
    }

    return (
        <div>
            <Chessboard
                boardWidth={boardWidth}
                position={game.fen()}
                onPieceDrop={onDrop}/>
        </div>
    )
}

export default ChessTest;