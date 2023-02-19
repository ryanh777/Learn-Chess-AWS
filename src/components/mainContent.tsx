import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { success } from '../redux/slices/login'
import ChessTest from './chesstest'

const MainContent = () => {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const dispatch = useAppDispatch();

    console.log("isloggedin:", isLoggedIn);

    return (
        <>
            { isLoggedIn ?
                <div className="flex flex-grow">
                    {/* <APITest/> */}
                    <ChessTest/>
                </div>
                :
                <div>
                    <button onClick={() => dispatch(success())}>yessir</button>
                </div>
            }
        </> 
    )
}

const test = async () => {
    const resp = await fetch('api/')
    .then((res) => res.json())
    console.log(resp);
}

const APITest = () => {
    return (
        <>
            <button onClick={test}>submit</button>
        </>
    )
}

export default MainContent