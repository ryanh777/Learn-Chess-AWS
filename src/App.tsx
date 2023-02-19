import ChessboardContainer from './components/chessboardContainer';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { success } from './redux/slices/login';

function App() {
	const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
	
	return (
		<div className='flex items-center min-h-screen bg-bgprimary text-textprimary'>
			{ isLoggedIn ?
                <div className="flex flex-grow">
                    <ChessboardContainer/>
                </div>
                :
                <div>
                    <button onClick={() => dispatch(success())}>yessir</button>
                </div>
            }
		</div>
	);
}

export default App;
