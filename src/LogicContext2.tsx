import { Chess } from "chess.js";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import logicReducer2 from "./@reducers/logic2";
import { LogicContextStateType2, LogicContextActionType2 } from "./@types";

const initialState: LogicContextStateType2 = { game: new Chess() }

const LogicContext2 = createContext<{
    state: LogicContextStateType2, 
    dispatch: Dispatch<LogicContextActionType2>
}>({
    state: initialState,
    dispatch: () => null
});

interface Props {
    children: ReactNode;
}

export const LogicContextProvider2 = (props: Props) => {
    const [state, dispatch] = useReducer(logicReducer2, initialState);

    return (
        <LogicContext2.Provider value={{state, dispatch}}>{props.children}</LogicContext2.Provider>
    )
}

export default LogicContext2;