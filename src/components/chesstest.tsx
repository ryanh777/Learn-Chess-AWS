import { useContext, useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move, Square } from 'chess.js'
import { safeGameMutate } from '../@helpers';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { drop } from '../redux/slices/boardLogic';

const ChessTest = () => {
    const game = useAppSelector((state) => state.logic.game);
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

    const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
        let move: Move | null = null;
        const gameCopy: Chess = safeGameMutate(game, (game) => {
            move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q"
             });
        })
        if (move == null) return false;
        dispatch(drop(gameCopy))
        return true;
    }

    return (
        <div>
            <Chessboard
                boardWidth={boardWidth}
                position={game.fen()}
                onPieceDrop={onDrop}
                />
        </div>
    )
}

export default ChessTest;