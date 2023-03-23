import { Chess } from 'chess.js';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Login from './components/login';
import MainContent from './components/mainContent';
import Sidebar from './components/sidebar';
import { useAppSelector } from './redux/hooks';

function App() {
   const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
   const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
   const [game, setGame] = useState<Chess>(new Chess())

   return (
      <div>
         { isLoggedIn ?
            isDesktop ? 
               <div className='relative flex min-h-screen bg-bgprimary text-textprimary'>
                  <MainContent game={game} setGame={setGame} />
                  <Sidebar game={game} setGame={setGame} />
               </div>
            :
               <div className='relative flex flex-col items-center min-h-screen bg-bgprimary text-textprimary'>
                  <Sidebar game={game} setGame={setGame} />
                  <MainContent game={game} setGame={setGame} />
               </div>
         :
            <Login/>
         }
      </div>
   );
}

export default App;
