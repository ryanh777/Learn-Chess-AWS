import MainContent from './components/mainContent';
import { LogicContextProvider2 } from './LogicContext2';

function App() {
	return (
		<div>
			<div className='flex items-center min-h-screen bg-bgprimary text-textprimary'>
				<LogicContextProvider2>
					<MainContent/>
				</LogicContextProvider2>
			</div>
		</div>
	);
}

export default App;
