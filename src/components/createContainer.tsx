import { Chess } from "chess.js"
import GameHistoryList from "./gameHistoryList"
import MoveButtonList from "./moveButtonList"

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const CreateContainer = (props: props) => {
   return (
      // <div className='flex flex-col flex-grow ml-6'>
      <div className='flex flex-col flex-grow m-2'>
         <div className='flex flex-col justify-between flex-grow mb-5 shadow-inner rounded-3xl bg-bgsecondary'>
            <GameHistoryList game={props.game} setGame={props.setGame} />
            <div className='relative flex items-center m-3 bg-bgtertiary justify-evenly basis-1/2 rounded-xl'>
               <MoveButtonList game={props.game} setGame={props.setGame} />
            </div>
         </div>
      </div>
   )
}

export default CreateContainer