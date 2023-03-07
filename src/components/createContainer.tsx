import { Move, Orientation } from "../@constants"
import { useAppSelector } from "../redux/hooks"
import FlipColorButton from "./flipColorButton"
import MoveButton from "./moveButton"
import RedoButton from "./redoButton"
import ResetButton from "./resetButton"
import SaveButton from "./saveButton"
import UndoButton from "./undoButton"

const CreateContainer = () => {
   const moves = useAppSelector((state) => state.board.moveData);
   const index = useAppSelector((state) => state.board.index);
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   const whiteRootMove = useAppSelector((state) => state.board.whiteRoot);
   const blackRootMove = useAppSelector((state) => state.board.blackRoot);

   let prevMove: Move;
   moves[index] ? 
      prevMove = moves[index] 
   : 
      boardOrientation == Orientation.white ?
         prevMove = whiteRootMove
      : 
         prevMove = blackRootMove

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