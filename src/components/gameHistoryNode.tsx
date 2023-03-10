import { Chess } from 'chess.js'
import { Move } from '../@constants'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setIndex } from '../redux/slices/board'

interface Props {
   move: Move
   count: number
   game: Chess
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const GameHistoryNode = (props: Props) => {
   const dispatch = useAppDispatch();
   const index = useAppSelector((state) => state.board.index);
   const moves = useAppSelector((state) => state.board.moveData);

   const handleClick = () => {
      const newIndex: number = moves.length - props.count - 1;
      dispatch(setIndex(newIndex));
      const newGame: Chess = new Chess();
      for (let i = 0; i < newIndex + 1; i++) {
         newGame.move(moves[i].move)
      }
      props.setGame(newGame)
   }

   return (
      <>
         {props.count === moves.length - index - 1 ?
            <div
               className="px-1 mx-1 text-lg rounded-sm bg-button h-min">
               {props.move.move}
            </div>
            :
            <div
               className="mx-1 text-lg hover:cursor-pointer hover:text-white h-min"
               onClick={handleClick}>
               {props.move.move}
            </div>
         }
      </>
   )
}

export default GameHistoryNode