import { Chess } from 'chess.js'
import { useState } from 'react'
import ChessboardContainer from './chessboardContainer'
import CreateContainer from './createContainer'

interface props {
   game: Chess,
   setGame: React.Dispatch<React.SetStateAction<Chess>>
}

const MainContent = (props: props) => {
   return (
      <>
         <div className="flex flex-grow">
            <CreateContainer game={props.game} setGame={props.setGame} />
            <ChessboardContainer game={props.game} setGame={props.setGame} />
         </div>
      </>
   )
}

export default MainContent