import MainContent from './components/mainContent';
import { LogicContextProvider } from './LogicContext';

function App() {
	return (
		<div>
			<div className='flex items-center min-h-screen bg-bgprimary text-textprimary'>
				<LogicContextProvider>
					<MainContent/>
				</LogicContextProvider>
			</div>
		</div>
	);
}

export default App;
