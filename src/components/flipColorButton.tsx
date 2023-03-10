import { Chess } from 'chess.js';
import { FiRepeat } from 'react-icons/fi'
import { useAppDispatch } from '../redux/hooks'
import { flip } from '../redux/slices/board';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const FlipColorButton = (props: props): JSX.Element => {
   const dispatch = useAppDispatch();

   const handleClick = async () => {
      dispatch(flip());
      props.setGame(new Chess())
   }

   return (
      <>
         <button
            className='flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover'
            onClick={handleClick}
         >
            {<FiRepeat size={32} />}
         </button>
      </>
   )
}

export default FlipColorButton