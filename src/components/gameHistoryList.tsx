import { Chess } from "chess.js"
import { useAppSelector } from "../redux/hooks";
import GameHistoryNode from "./gameHistoryNode";

interface props {
   game: Chess
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const GameHistoryList = (props: props) => {
   const moves = useAppSelector((state) => state.board.moveList);
   return (
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
   )
}

export default GameHistoryList;