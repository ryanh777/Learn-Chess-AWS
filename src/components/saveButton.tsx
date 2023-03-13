import { Chess } from 'chess.js'
import { RiSave3Fill } from 'react-icons/ri'
import { Move, Orientation, SavedMove } from '../@constants'
import { getRootMove, postMoves } from '../@helpers'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { resetAndSetBlackRootMove, resetAndSetWhiteRootMove, setPrevMoveToRoot } from '../redux/slices/board'

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const SaveButton = (props: props): JSX.Element => {
   const dispatch = useAppDispatch();
   const moves = useAppSelector((state) => state.board.moveData);
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   const user = useAppSelector((state) => state.user);
   const whiteRootID = useAppSelector((state) => state.board.whiteRoot.id)
   const blackRootID = useAppSelector((state) => state.board.blackRoot.id)

   const findStartIndexForUnsavedMoves = (moves: Move[]): number => {
      if (moves[0].id == "") return 0;
      return fSIFUM(moves, 0, moves.length - 1)
   }

   const fSIFUM = (moves: Move[], left: number, right: number): number => {
      if (right - left == 1) return right;
      const target = Math.floor((right + left) / 2);
      if (moves[target].id == "") {
         return fSIFUM(moves, left, target)
      } else {
         return fSIFUM(moves, target, right)
      }
   }

   const handleClick = async () => {
      const startIndex: number = findStartIndexForUnsavedMoves(moves)
      let movesToBeSaved: SavedMove[] = []
      for (let i = startIndex; i < moves.length; i++) {
         movesToBeSaved.push({
            user: user.username,
            move: moves[i].move,
            piece: moves[i].piece
         })
      }
      if (startIndex == 0) {
         boardOrientation  == Orientation.white ?
            await postMoves(movesToBeSaved, whiteRootID)
         :
            await postMoves(movesToBeSaved, blackRootID)
      } else {
         await postMoves(movesToBeSaved, moves[startIndex - 1].id)
      }
      const rootMove: Move = await getRootMove(boardOrientation, user);
      boardOrientation == Orientation.white ?
         dispatch(resetAndSetWhiteRootMove(rootMove))
         :
         dispatch(resetAndSetBlackRootMove(rootMove))
      dispatch(setPrevMoveToRoot())
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