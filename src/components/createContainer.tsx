import { Chess } from "chess.js"
import { useAppSelector } from "../redux/hooks"
import DeleteButton from "./deleteButton"
import FlipColorButton from "./flipColorButton"
import GameHistoryNode from "./gameHistoryNode"
import MoveButton from "./moveButton"
import RedoButton from "./redoButton"
import ResetButton from "./resetButton"
import SaveButton from "./saveButton"
import UndoButton from "./undoButton"

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const CreateContainer = (props: props) => {
   const moves = useAppSelector((state) => state.board.moveData);
   const prevMove = useAppSelector((state) => state.board.prevMove);

   return (
      <div className='flex flex-col flex-grow ml-6'>
         <div className='flex flex-col justify-between flex-grow mb-5 shadow-inner rounded-3xl bg-bgsecondary'>
            <div className='relative flex items-center m-3 bg-bgtertiary justify-evenly basis-1/2 rounded-xl'>
               <div className="absolute top-3 right-3"><DeleteButton /></div>
               {prevMove.childData.map((child, index) =>
                  <MoveButton key={index} child={child} game={props.game} setGame={props.setGame} />
               )}
            </div>
            <div className='flex flex-wrap p-2 m-3 bg-bgtertiary basis-1/2 rounded-xl'>
               {moves.map((move, index, arr) =>
                  <>
                     {index % 2 === 0 &&
                        <div className='ml-1 text-lg'>{index / 2 + 1}.</div>
                     }
                     <GameHistoryNode
                        key={index}
                        move={move}
                        count={arr.length - index - 1}
                        game={props.game}
                        setGame={props.setGame} />
                  </>
               )}
            </div>
         </div>
         <div className='flex h-24 p-3 bg-bgsecondary rounded-3xl'>
            <div className="flex flex-grow">
               <UndoButton game={props.game} setGame={props.setGame} />
               <RedoButton game={props.game} setGame={props.setGame} />
            </div>
            <ResetButton game={props.game} setGame={props.setGame} />
            <SaveButton game={props.game} setGame={props.setGame} />
            <FlipColorButton game={props.game} setGame={props.setGame} />
         </div>
      </div>
   )
}

export default CreateContainer