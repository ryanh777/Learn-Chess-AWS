import AppStateButton from "./appStateButton";
import { IoMdCreate } from 'react-icons/io'
import { IoBook } from 'react-icons/io5'
import { GrTest } from 'react-icons/gr'
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAppState } from "../redux/slices/app";
import { AppState } from "../@constants";
import { reset } from "../redux/slices/board";
import { Chess } from "chess.js";

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const Sidebar = (props: props) => {
   const dispatch = useAppDispatch();
   const appState = useAppSelector((state) => state.app.appState);
   const moveData = useAppSelector((state) => state.board.moveData);
   const prevMove = useAppSelector((state) => state.board.prevMove);
   const index = useAppSelector((state) => state.board.index);

   const test = () => {
      console.log("moveData:", moveData)
      console.log("prevMove:", prevMove)
      console.log("index", index);
      console.log("game history", props.game.history())
   }
   
   return (
      <div className='flex flex-col w-20 h-screen bg-bgtertiary'>
         <div 
            onClick={() => {
               dispatch(setAppState(AppState.Create))
               dispatch(reset()) 
               props.setGame(new Chess())
            }}>
            <AppStateButton active={appState == "create" ? true : false} icon={<IoMdCreate size={34} />}/>
         </div>
         <div 
            onClick={() => {
               dispatch(setAppState(AppState.Learn))
               dispatch(reset())
               props.setGame(new Chess())
            }}>
            <AppStateButton active={appState == "learn" ? true : false} icon={<IoBook size={34} />}/>
         </div>
         <div onClick={test}><AppStateButton active={false} icon={<GrTest size={34} />}/></div>
      </div>
   )
}

export default Sidebar;