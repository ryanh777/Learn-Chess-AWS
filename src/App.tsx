import MainContent from './components/mainContent';
import Sidebar from './components/sidebar';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { success } from './redux/slices/login';

function App() {
	const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const dispatch = useAppDispatch();
	
	return (
        <div>
			{ isLoggedIn ?
                <div className='flex items-center min-h-screen bg-bgprimary text-textprimary'>
                    <MainContent/>
                    <Sidebar/>
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
