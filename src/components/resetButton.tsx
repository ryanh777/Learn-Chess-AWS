import { Chess } from 'chess.js';
import { AiOutlineClear } from 'react-icons/ai'
import { useAppDispatch } from '../redux/hooks';
import { reset } from '../redux/slices/board';

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const ResetButton = (props: props) => {
   const dispatch = useAppDispatch();

   const handleClick = async () => {
      dispatch(reset())
      props.setGame(new Chess())
   }

   return (
      <button
         className="flex items-center justify-center flex-grow mx-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
         onClick={handleClick}>
         {<AiOutlineClear size={36} />}
      </button>
   )
}

export default ResetButton