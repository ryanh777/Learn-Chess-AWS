import { Chess } from 'chess.js';
import { TiChevronRight } from 'react-icons/ti'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { redo } from '../redux/slices/board';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const RedoButton = (props: props) => {
   const dispatch = useAppDispatch();
   const moveList = useAppSelector((state) => state.board.moveList);
   const index = useAppSelector((state) => state.board.index)

   const handleClick = async () => {
      if (index + 1 >= moveList.length) return;
      const newBoard = new Chess(moveList[index+1].fen)
      props.setGame(newBoard)
      dispatch(redo());
   }

   return (
      <button
         className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
         onClick={handleClick}>
         {<TiChevronRight size={36} />}
      </button>

   )
}

export default RedoButton;