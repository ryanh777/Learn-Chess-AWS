import { FiRepeat } from 'react-icons/fi'
import { Orientation } from '../@constants';
import { getRootMove } from '../@helpers';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { flip } from '../redux/slices/board';

const FlipColorButton = (): JSX.Element => {
   const dispatch = useAppDispatch();
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   const user = useAppSelector((state) => state.user);

   const handleClick = async () => {
      let flippedOrientation: Orientation;
      boardOrientation == Orientation.white ? 
         flippedOrientation = Orientation.black : flippedOrientation = Orientation.white;
      dispatch(flip(await getRootMove(flippedOrientation, user)))
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