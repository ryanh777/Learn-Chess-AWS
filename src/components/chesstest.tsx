import { useContext, useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move, Square } from 'chess.js'
import LogicContext2 from '../LogicContext2';
import { safeGameMutate } from '../@helpers';

const ChessTest = () => {
    const { state, dispatch } = useContext(LogicContext2)
    const { game } = state
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
        dispatch({ 
            type: "drop", 
            payload: gameCopy
         })
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