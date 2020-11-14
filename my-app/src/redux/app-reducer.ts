import { authUserThunkCreator } from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
// import {authAPI} from "../api/api";
// import {stopSubmit} from "redux-form";

const INITIALIZED_SUCCESS="INITIALIZED_SUCCESS";

export type initialStateType={
    initialized:false
}
let initialState: initialStateType = {
    initialized:false
}

 const appReducer=(state=initialState, action:ActionType)=>{
  
   switch (action.type) {
       case INITIALIZED_SUCCESS:
           return{
               ...state,
               initialized:true
           }
    
         default:
             return state;
     }
 }

 type ActionType=initializedSuccessActionType;

type initializedSuccessActionType={
    type: typeof INITIALIZED_SUCCESS
}

 const initializedSuccess=():initializedSuccessActionType=>({type:INITIALIZED_SUCCESS});


export const initializeApp = () :ThunkAction<void, AppStateType, unknown, ActionType> => {
    return (dispatch) => {
        let promise = dispatch(authUserThunkCreator());

        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess());
        })
    };
}


export default appReducer;
