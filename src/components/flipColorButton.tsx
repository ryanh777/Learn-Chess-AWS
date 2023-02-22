import { FiRepeat } from 'react-icons/fi'

const FlipColorButton = (): JSX.Element => {
       return (
       <>
          <button
             className='flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover' 
             >
             {<FiRepeat size={32} />}
          </button>
       </>
       )
 }
 
 export default FlipColorButton