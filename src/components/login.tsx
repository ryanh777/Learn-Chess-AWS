import { useEffect, useState } from "react";
import { DBMove, User } from "../@constants";
import { fetchPostionFromID, postMove } from "../@helpers";
import { useAppDispatch } from "../redux/hooks";
import { setRoot } from "../redux/slices/board";
import { setUser } from "../redux/slices/user";

const Login = () => {
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
         const userExistsResponse = await fetch('api/user/exists', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username })
         })
         if (!userExistsResponse.ok) {
            throw new Error(await userExistsResponse.text())
         }

         const rootPosition = {
            user: username,
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -",
         }

         const user = {
            username: username,
            password: password,
            rootID: await postMove(rootPosition),
         }

         const registerUserResponse = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
         })
         if (!registerUserResponse.ok) {
            throw new Error(await registerUserResponse.text())
         }
         dispatchLogin({
            username: username,
            rootID: user.rootID,
         })
      } catch (err: any) {
         setError(err.message)
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
            rootID: filteredResponse.rootID,
         })
      } catch (err: any) {
         console.log(err.message)
         setError(err.message)
      }
   }

   const dispatchLogin = async (user: User) => {
      dispatch(setRoot(await fetchPostionFromID(user.rootID)))
      dispatch(setUser(user));
   }

   return (
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
   )
}

export default Login;