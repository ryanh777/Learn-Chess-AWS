import { Chess } from 'chess.js'
import { LocalMove } from '../@constants'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setIndex } from '../redux/slices/board'

interface props {
   move: LocalMove
   count: number
   game: Chess
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const GameHistoryNode = (props: props) => {
   const dispatch = useAppDispatch();
   const index = useAppSelector((state) => state.board.index);
   const moveList = useAppSelector((state) => state.board.moveList);

   const handleClick = () => {
      const newIndex: number = moveList.length - props.count - 1;
      dispatch(setIndex(newIndex));
      const newGame: Chess = new Chess(moveList[newIndex].fen);
      props.setGame(newGame)
   }

   return (
      <>
         {props.count === moveList.length - index - 1 ?
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