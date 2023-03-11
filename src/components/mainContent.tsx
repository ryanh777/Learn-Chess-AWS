import { Chess } from 'chess.js'
import { AppState } from '../@constants'
import { useAppSelector } from '../redux/hooks'
import ChessboardContainer from './chessboardContainer'
import CreateContainer from './createContainer'

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const MainContent = (props: props) => {
   const appState = useAppSelector((state) => state.app.appState);

   return (
      <>
         {appState == AppState.create ?
            <div className="flex flex-grow">
               <CreateContainer game={props.game} setGame={props.setGame} />
               <ChessboardContainer game={props.game} setGame={props.setGame} />
            </div>
            :
            <div className="flex flex-grow justify-center">
               <ChessboardContainer game={props.game} setGame={props.setGame} />
            </div>
         }
      </>
   )
}

export default MainContent