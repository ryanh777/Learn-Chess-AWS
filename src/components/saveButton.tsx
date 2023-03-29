import { Chess } from 'chess.js'
import { RiSave3Fill } from 'react-icons/ri'
import { postMoves } from '../@helpers'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setRoot } from '../redux/slices/board'

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const SaveButton = (props: props): JSX.Element => {
   const dispatch = useAppDispatch();
   const moveList = useAppSelector((state) => state.board.moveList);
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   const user = useAppSelector((state) => state.user);
   const index = useAppSelector((state) => state.board.index)

   const handleClick = async () => {
      const rootMove = await postMoves(moveList.slice(0, index+1), user.username, boardOrientation)
      dispatch(setRoot(rootMove))
      props.setGame(new Chess())
   }

   return (
      <button
         className="flex items-center justify-center flex-grow mr-1 text-lg bg-button rounded-xl hover:bg-buttonHover"
         onClick={handleClick}
      >
         {<RiSave3Fill size={36} />}
      </button>
   )
}

export default SaveButton;