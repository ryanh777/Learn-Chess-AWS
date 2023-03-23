import { Chess } from "chess.js"
import GameHistoryList from "./gameHistoryList"
import MoveButtonList from "./moveButtonList"

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const CreateContainer = (props: props) => {
   return (
      <div className='flex flex-col flex-grow my-2 lg:my-0 lg:mb-4 shadow-inner rounded-3xl bg-bgsecondary'>
         <GameHistoryList game={props.game} setGame={props.setGame} />
         <MoveButtonList game={props.game} setGame={props.setGame} />
      </div>
   )
}

export default CreateContainer