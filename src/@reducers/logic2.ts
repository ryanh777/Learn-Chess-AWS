import { LogicContextActionType2, LogicContextStateType2 } from "../@types";

const logicReducer2 = (
   state: LogicContextStateType2,
   action: LogicContextActionType2
) => {
   switch (action.type) {
      case "drop": {
         return {
            ...state,
            game: action.payload,
         };
      }
   }
};

export default logicReducer2;
