import { Chess } from 'chess.js'
import { RiSave3Fill } from 'react-icons/ri'
import { Move, MoveData, Orientation } from '../@constants'
import { getChildren, getRootMove, postMove } from '../@helpers'
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

   const createChild = async (parentID: string, move: string, piece: string): Promise<string> => {
      const newChild = {
         user: user.username,
         move: move,
         piece: piece
      }
      const id = await postMove(newChild)
      const childInfo: MoveData = {
         id: id,
         move: move,
         piece: piece
      }
      await fetch(`/api/data/add/${parentID}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(childInfo)
      })
         .then(res => res.json())
         .then(data => console.log("data:", data))
      return id;
   }

   const handleClick = async () => {
      if (moves.length === 0) {
         console.log("must make a move before saving")
         return
      }

      let id: string = boardOrientation === "white" ? user.whiteRootID : user.blackRootID
      let childData: MoveData[] = await getChildren(id)

      for (let i = 0; i < moves.length; i++) {
         let hasChildren: boolean = (childData.length > 0) ? true : false
         if (hasChildren) {
            let broken: boolean = false
            for (let j = 0; j < childData.length; j++) {
               if (childData[j].move === moves[i].move) {
                  id = childData[j].id
                  childData = await getChildren(id)
                  broken = true
                  break
               }
            }
            if (!broken) id = await createChild(id, moves[i].move, moves[i].piece)
         } else {
            id = await createChild(id, moves[i].move, moves[i].piece)
         }
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