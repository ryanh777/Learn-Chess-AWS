import FlipColorButton from "./flipColorButton"
import ResetButton from "./resetButton"
import SaveButton from "./saveButton"
import UndoButton from "./undoButton"

const CreateContainer = () => {
   return (
      <div className='flex flex-col flex-grow ml-6'>
         <div className='flex flex-col justify-between flex-grow mb-5 shadow-inner rounded-3xl bg-bgsecondary'></div>
         <div className='flex h-24 p-3 bg-bgsecondary rounded-3xl'>
            <UndoButton/>
            <ResetButton/>
            <SaveButton/>
            <FlipColorButton/>
         </div>
      </div>
   )
}
 
 export default CreateContainer