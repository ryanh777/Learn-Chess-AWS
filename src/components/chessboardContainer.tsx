import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move as ChessMove, Square } from 'chess.js'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { drop, setPrevMove } from '../redux/slices/board';
import { fetchMove } from '../@helpers';
import { Move } from '../@constants';

const ChessboardContainer = () => {
    const moves = useAppSelector((state) => state.board.moveData);
    const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
    const prevMove = useAppSelector((state) => state.board.prevMove);
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
            newGame.move(move.move);
        })
        setGame(newGame)
    }, [moves])

    const onDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
        let move: ChessMove | null = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });
        if (move == null) return false;
        let moveID: string = "";
        if (prevMove.childData) {
            for (const moveData of prevMove.childData) {
                if (moveData.move == move.san) moveID = moveData.id; break;
            }
        }
        dispatch(drop({ move: move.san, piece: move.color.concat(move.piece), id: moveID}))
        updatePrevMove(move.san);
        return true;
    }

    const updatePrevMove = async (lastMove: string) => {
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
            dispatch(setPrevMove(move))
            return
        }
        const move: Move = await fetchMove(userMoveID)
        dispatch(setPrevMove(move))
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