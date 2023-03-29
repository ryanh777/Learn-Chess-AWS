import { Chess } from 'chess.js';
import { TiChevronLeft } from 'react-icons/ti'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { undo } from '../redux/slices/board';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const UndoButton = (props: props) => {
   const dispatch = useAppDispatch();
   const moveList = useAppSelector((state) => state.board.moveList)
   const index = useAppSelector((state) => state.board.index)

   const handleClick = async () => {
      if (index < 0) return
      if (index == 0) {
         props.setGame(new Chess())
      }
      if (index > 0) {
         props.setGame(new Chess(moveList[index-1].fen))
      }
      dispatch(undo());
   }

   return (
      <button
         className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
         onClick={handleClick}>
         {<TiChevronLeft size={36} />}
      </button>
   )
}

export default UndoButton