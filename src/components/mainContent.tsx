import ChessboardContainer from './chessboard'
import ChessTest from './chesstest'

const MainContent = () => {
    return (
        <>
            {
                <div className="flex flex-grow">
                    {/* <ChessboardContainer/> */}
                    <APITest/>
                    <ChessTest/>
                </div>
            }
        </> 
    )
}

const test = async () => {
    const resp = await fetch('http://52.201.219.243/')
    .then((res) => res.json())
    console.log("response:", resp);
}

const APITest = () => {
    return (
        <>
            {
                <button onClick={test}>submit</button>
            }
        </>
    )
}

export default MainContent