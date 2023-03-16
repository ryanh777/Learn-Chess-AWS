import { Chess } from 'chess.js';
import { TiChevronLeft } from 'react-icons/ti'
import { safeGameMutate } from '../@helpers';
import { useAppDispatch } from '../redux/hooks';
import { undo } from '../redux/slices/board';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const UndoButton = (props: props) => {
   const dispatch = useAppDispatch();

   const handleClick = async () => {
      dispatch(undo());
      props.setGame(safeGameMutate(props.game, (game) => {
         return game.undo()
      }))
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