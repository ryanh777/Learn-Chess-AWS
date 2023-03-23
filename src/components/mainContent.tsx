import { Chess } from 'chess.js'
import { useMediaQuery } from 'react-responsive'
import { AppState } from '../@constants'
import { useAppSelector } from '../redux/hooks'
import BoardButtons from './boardButtons'
import ChessboardContainer from './chessboardContainer'
import CreateContainer from './createContainer'

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const MainContent = (props: props) => {
   const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
   return (
      <>
         {
            isDesktop ? 
               <Desktop game={props.game} setGame={props.setGame} />
            :
               <Mobile game={props.game} setGame={props.setGame} />
         }
      </>
   )
}

const Mobile = (props: props) => {
   const appState = useAppSelector((state) => state.app.appState);
   return (
      <>
         {appState == AppState.create ?
            <div className="flex flex-col flex-grow">
               <CreateContainer game={props.game} setGame={props.setGame} />
               <ChessboardContainer game={props.game} setGame={props.setGame} />
               <BoardButtons game={props.game} setGame={props.setGame} />
            </div>
            :
            <div className="flex flex-grow items-center">
               <ChessboardContainer game={props.game} setGame={props.setGame} />
            </div>
         }
      </>
   )
}

const Desktop = (props: props) => {
   const appState = useAppSelector((state) => state.app.appState);
   return (
      <>
         {appState == AppState.create ?
            <div className="flex flex-grow p-4">
               <div className='flex flex-col flex-grow mr-4'>
                  <CreateContainer game={props.game} setGame={props.setGame} />
                  <BoardButtons game={props.game} setGame={props.setGame} />
               </div>
               <ChessboardContainer game={props.game} setGame={props.setGame} />
            </div>
            :
            <div className="flex flex-grow justify-center py-4">
               <ChessboardContainer game={props.game} setGame={props.setGame} />
            </div>
         }
      </>
   )
}

export default MainContent