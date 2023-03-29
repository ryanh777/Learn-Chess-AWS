import { Chess } from "chess.js";
import { useAppSelector } from "../redux/hooks";
import DeleteButton from "./deleteButton";
import MoveButton from "./moveButton";

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const MoveButtonList = (props: props) => {
   const prevMove = useAppSelector((state) => state.board.prevMove);
   return (
      <div className='relative flex items-center m-3 bg-bgtertiary justify-evenly basis-1/2 rounded-xl'>
         {prevMove.nextMoveList.length > 0 && <div className="absolute top-3 right-3"><DeleteButton /></div>}
         {prevMove.nextMoveList.map((child, index) =>
            <MoveButton key={index} child={child} game={props.game} setGame={props.setGame} />
         )}
      </div>
   )
}

export default MoveButtonList; 