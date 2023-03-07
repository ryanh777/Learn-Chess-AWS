import { Move, Orientation } from "../@constants"
import { useAppSelector } from "../redux/hooks"
import FlipColorButton from "./flipColorButton"
import MoveButton from "./moveButton"
import RedoButton from "./redoButton"
import ResetButton from "./resetButton"
import SaveButton from "./saveButton"
import UndoButton from "./undoButton"

const CreateContainer = () => {
   const prevMove = useAppSelector((state) => state.board.prevMove);

   return (
      <div className='flex flex-col flex-grow ml-6'>
         <div className='flex flex-col justify-between flex-grow mb-5 shadow-inner rounded-3xl bg-bgsecondary'>
            <div className='flex items-center m-3 bg-bgtertiary justify-evenly basis-1/2 rounded-xl'>
               {prevMove.childData.map((child, index) => 
                  <MoveButton key={index} child={child}/>
               )}
            </div>
         </div>
         <div className='flex h-24 p-3 bg-bgsecondary rounded-3xl'>
            <div className="flex">
               <UndoButton/>
               <RedoButton/>
            </div>
            <ResetButton/>
            <SaveButton/>
            <FlipColorButton/>
         </div>
      </div>
   )
}
 
 export default CreateContainer