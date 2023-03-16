import { Chess } from "chess.js";
import FlipColorButton from "./flipColorButton";
import RedoButton from "./redoButton";
import ResetButton from "./resetButton";
import SaveButton from "./saveButton";
import UndoButton from "./undoButton";

interface props {
   game: Chess
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const BoardButtons = (props: props) => {
   return (
      <div className='flex h-24 py-3 bg-bgsecondary'>
         <ResetButton game={props.game} setGame={props.setGame} />
         <SaveButton game={props.game} setGame={props.setGame} />
         <FlipColorButton game={props.game} setGame={props.setGame} />
         <UndoButton game={props.game} setGame={props.setGame} />
         <RedoButton game={props.game} setGame={props.setGame} />
      </div>
   )
}

export default BoardButtons;