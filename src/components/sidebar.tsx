import AppStateButton from "./appStateButton";
import { IoBook, IoConstruct } from 'react-icons/io5'
import { GrTest } from 'react-icons/gr'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAppState } from "../redux/slices/app";
import { AppState, Orientation, NextMove } from "../@constants";
import { editPrevMove, reset } from "../redux/slices/board";
import { Chess } from "chess.js";
import { fetchPostionFromFen } from "../@helpers";
import { pickWeightedRandomIndex } from "../handleLearnFuncs";

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const Sidebar = (props: props) => {
   const dispatch = useAppDispatch();
   const appState = useAppSelector((state) => state.app.appState);
   const boardOrientation = useAppSelector((state) => state.board.boardOrientation);
   const user = useAppSelector((state) => state.user)
   const moveList = useAppSelector((state) => state.board.moveList);
   const prevMove = useAppSelector((state) => state.board.prevMove);
   const index = useAppSelector((state) => state.board.index);
   const root = useAppSelector((state) => state.board.root)

   const test = async () => {
      console.log("moveList:", moveList)
      console.log("prevMove:", prevMove)
      // console.log("index", index);
      console.log("game history", props.game.history())
      // console.log("user:", user)
      // console.log("rootMove:", rootMove)
   }

   return (
      <div className='flex lg:flex-col justify-around lg:justify-start items-center w-screen lg:w-20 lg:min-h-screen lg:pt-4 bg-bgtertiary'>
         {/* Create */}
         <div
            onClick={() => {
               dispatch(setAppState(AppState.create))
               dispatch(reset())
               props.setGame(new Chess())
            }}>
            <AppStateButton active={appState == "create" ? true : false} icon={
               appState == "create" ? <IoConstruct size={44}/> : <IoConstruct fill={"#83817c"} size={36}/>
            } />
         </div>
         {/* Learn */}
         <div
            onClick={async () => {
               if (boardOrientation == Orientation.white && root.nextMovesWhite.length == 0) {
                  alert("You must save a line before learning")
                  return
               }
               if (boardOrientation == Orientation.black) {
                  if (root.nextMovesBlack.length == 0) {
                     alert("You must save a line before learning")
                     return
                  }
                  const autoMove: NextMove = root.nextMovesBlack[pickWeightedRandomIndex(root.nextMovesBlack)]
                  props.setGame(new Chess(autoMove.fen));
                  dispatch(editPrevMove(await fetchPostionFromFen({ user: user.username, fen: autoMove.fen })))
                  return;
               }
               dispatch(setAppState(AppState.learn))
               dispatch(reset())
               props.setGame(new Chess())
            }}>
            <AppStateButton active={appState == "learn" ? true : false} icon={
               appState == "learn" ? <IoBook size={44} /> : <IoBook fill={"#83817c"} size={36} />
            } />
         </div>
         {/* Test */}
         <div onClick={test}><AppStateButton active={false} icon={<GrTest fill="none" stroke="red" />} /></div>
      </div>
   )
}

export default Sidebar;