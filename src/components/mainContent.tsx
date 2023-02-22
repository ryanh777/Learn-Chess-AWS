import ChessboardContainer from './chessboardContainer'
import CreateContainer from './createContainer'

const MainContent = () => {
    return (
        <>
            <div className="flex flex-grow">
                    <CreateContainer/>
                    <ChessboardContainer/>
            </div>
        </> 
    )
}

export default MainContent