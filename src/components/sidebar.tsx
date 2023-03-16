import AppStateButton from "./appStateButton";
import { IoMdCreate } from 'react-icons/io'
import { IoBook, IoConstruct } from 'react-icons/io5'
import { GrTest } from 'react-icons/gr'
// import { GrTest } from '../icons'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import app, { setAppState } from "../redux/slices/app";
import { AppState, Orientation, MoveData, Move, SavedMove } from "../@constants";
import { makeMove, reset } from "../redux/slices/board";
import { Chess } from "chess.js";
import { getMoveIfChildOfPrev, getRandomInt } from "../handleLearnFuncs";

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const Sidebar = (props: props) => {
   const dispatch = useAppDispatch();
   const appState = useAppSelector((state) => state.app.appState);
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   const blackRoot = useAppSelector((state) => state.board.blackRoot);
   const user = useAppSelector((state) => state.user.username)
   const whiteRootID = useAppSelector((state) => state.board.whiteRoot.id)
   const moveData = useAppSelector((state) => state.board.moveData);
   const prevMove = useAppSelector((state) => state.board.prevMove);
   const index = useAppSelector((state) => state.board.index);

   const test = async () => {
      console.log("moveData:", moveData)
      console.log("prevMove:", prevMove)
      console.log("index", index);
      console.log("game history", props.game.history())
   }

   return (
      // <div className='flex flex-col w-20 h-screen bg-bgtertiary'>
      <div className='flex justify-around items-center w-screen bg-bgtertiary'>
         {/* Create */}
         <div
            onClick={() => {
               dispatch(setAppState(AppState.create))
               dispatch(reset())
               props.setGame(new Chess())
            }}>
            <AppStateButton active={appState == "create" ? true : false} icon={
               appState == "create" ? <IoConstruct size={36}/> : <IoConstruct fill={"#83817c"} size={32}/>
            } />
         </div>
         {/* Learn */}
         <div
            onClick={async () => {
               dispatch(setAppState(AppState.learn))
               dispatch(reset())
               if (boardOrientation == Orientation.black) {
                  const autoMove: MoveData = blackRoot.childData[getRandomInt(blackRoot.childData.length)]
                  const newGame: Chess = new Chess();
                  newGame.move(autoMove.move);
                  props.setGame(newGame);
                  const childMove: Move | undefined = await getMoveIfChildOfPrev(autoMove.move, blackRoot);
                  if (childMove) dispatch(makeMove(childMove))
                  return;
               }
               props.setGame(new Chess())
            }}>
            <AppStateButton active={appState == "learn" ? true : false} icon={
               appState == "learn" ? <IoBook size={36} /> : <IoBook fill={"#83817c"} size={32} />
            } />
         </div>
         {/* Test */}
         <div onClick={test}><AppStateButton active={false} icon={<GrTest fill="none" stroke="red" />} /></div>
      </div>
   )
}

export default Sidebar;