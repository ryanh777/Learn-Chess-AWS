import FlipColorButton from "./flipColorButton"
import ResetButton from "./resetButton"
import SaveButton from "./saveButton"
import { TiChevronLeft } from 'react-icons/ti'

const CreateContainer = () => {
    return (
       <div className='flex flex-col flex-grow ml-6'>
          <div className='flex flex-col justify-between flex-grow mb-5 shadow-inner rounded-3xl bg-bgsecondary'>
          </div>
          <div className='flex h-24 p-3 bg-bgsecondary rounded-3xl'>
             <button className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover">{<TiChevronLeft size={40} />}</button>
             <ResetButton/>
             <SaveButton/>
             <FlipColorButton/>
             {/* <LearnStateButton/> */}
          </div>
       </div>
       
    )
 }
 
 export default CreateContainer