import ChessboardContainer from './chessboard'
import ChessTest from './chesstest'

const MainContent = () => {
    return (
        <>
            {
                <div className="flex flex-grow">
                    {/* <ChessboardContainer/> */}
                    <ChessTest/>
                </div>
            }
        </> 
    )
}

export default MainContent