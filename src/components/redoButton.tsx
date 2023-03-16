import { Chess } from 'chess.js';
import { TiChevronRight } from 'react-icons/ti'
import { safeGameMutate } from '../@helpers';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { redo } from '../redux/slices/board';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const RedoButton = (props: props) => {
   const dispatch = useAppDispatch();
   const moves = useAppSelector((state) => state.board.moveData);
   const index = useAppSelector((state) => state.board.index)

   const handleClick = async () => {
      if (index + 1 >= moves.length) return;
      props.setGame(safeGameMutate(props.game, (game) => {
         game.move(moves[index+1].move)
      }))
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