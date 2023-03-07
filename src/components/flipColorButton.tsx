import { FiRepeat } from 'react-icons/fi'
import { useAppDispatch } from '../redux/hooks'
import { flip } from '../redux/slices/board';

const FlipColorButton = (): JSX.Element => {
   const dispatch = useAppDispatch();

   const handleClick = async () => {
      dispatch(flip());
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