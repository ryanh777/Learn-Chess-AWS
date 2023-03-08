import { useEffect, useState } from 'react';
import { Move, User } from './@constants';
import { fetchMove, postMove } from './@helpers';
import MainContent from './components/mainContent';
import Sidebar from './components/sidebar';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { resetAndSetWhiteRootMove, resetAndSetBlackRootMove, setPrevMoveToRoot } from './redux/slices/board';
import { setUser } from './redux/slices/user';

function App() {
	const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) return
		const fetchToken = async () => {
			const response = await fetch('/api/user', {
				method: 'GET',
				headers: {
					'auth-token': `${token}`
				}
			})
			if (response.ok) {
                dispatchLogin(await response.json());
			}
		}
		fetchToken()
	}, [])

    const register = async () => {
        try {
            const response = await fetch('api/user/exists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username})
            })
            if (!response.ok) {
                throw new Error(await response.text())
            } 
        } catch (err: any) {
            console.log(err)
            setError(err.message)
            return
        }

        const whiteRoot = {
            move: `${username}-white-root`,
            parentID: "root",
            piece: "root"
        }
        const blackRoot = {
            move: `${username}-black-root`,
            parentID: "root",
            piece: "root"
        }
        const user = {
            username: username,
            password: password,
            whiteRootID: await postMove(whiteRoot),
            blackRootID: await postMove(blackRoot)
        }
        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            if (!response.ok) {
                throw new Error(await response.text())
            } 
            dispatchLogin({
                username: username,
                whiteRootID: user.whiteRootID,
                blackRootID: user.blackRootID
            })
        } catch (err: any) {
            console.log(err)
            setError(err)
        }
    };

    const login = async () => {
        const user = {
			username: username,
			password: password
		}
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
      
            if (!response.ok) throw new Error(await response.text())
      
            const token: string | null = response.headers.get('auth-token')
            if (!token) throw new Error("token returned null")
            localStorage.setItem('token', token)

            const filteredResponse = await response.json()
            dispatchLogin({
                username: username,
                whiteRootID: filteredResponse.whiteRootID,
                blackRootID: filteredResponse.blackRootID,
            })
        } catch (err: any) {
            console.log(err.message)
            setError(err.message)
        }
    }

    const dispatchLogin = async (
        user: User
    ) => {
        const whiteRootMove: Move = await fetchMove(user.whiteRootID);
        const blackRootMove: Move = await fetchMove(user.blackRootID);
        dispatch(resetAndSetWhiteRootMove(whiteRootMove));
        dispatch(resetAndSetBlackRootMove(blackRootMove));
        dispatch(setPrevMoveToRoot())
        dispatch(setUser(user));
    }
	
	return (
        <div>
			{ isLoggedIn ?
                <div className='flex items-center min-h-screen bg-bgprimary text-textprimary'>
                    <MainContent/>
                    <Sidebar/>
                </div>
                :
                <div>
                    <div>
                        Register:
                        <input placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
                        <input placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
                        <button onClick={register}>yessir</button>
                    </div>
                    <div>
                        Login:
                        <input placeholder='username' onChange={(e) => setUsername(e.target.value)}></input>
                        <input placeholder='password' onChange={(e) => setPassword(e.target.value)}></input>
                        <button onClick={login}>yessir</button>
                    </div>
                    <div className='text-red-500'>{error}</div>
                </div>
            }
		</div>
	);
}

export default App;
