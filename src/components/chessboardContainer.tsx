import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move, Square } from 'chess.js'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { drop } from '../redux/slices/board';

const ChessboardContainer = () => {
    const moves = useAppSelector((state) => state.board.moves);
    const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
    const [game, setGame] = useState(new Chess());
    const dispatch = useAppDispatch();
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
        dispatch(drop({ move: move.san, piece: (move.color.concat(move.piece))}))
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

export default ChessboardContainer;