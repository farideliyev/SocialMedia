import { authUserThunkCreator } from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
// import {authAPI} from "../api/api";
// import {stopSubmit} from "redux-form";

let initialState = {
    initialized:false
}

export type initialStateType= typeof initialState
type ActionsType=InferActionsTypes<typeof actions>

 const appReducer=(state=initialState, action:ActionsType) :initialStateType=>{
  
   switch (action.type) {
       case 'SN/APP/INITIALIZED_SUCCESS':
           return{
               ...state,
               initialized:true
           }
    
         default:
             return state;
     }
 }

const actions={
    initializedSuccess: ()=>({type:'SN/APP/INITIALIZED_SUCCESS'} as const)
}


export const initializeApp = () :ThunkAction<void, AppStateType, unknown, ActionsType> => {
    return (dispatch) => {
        let promise = dispatch(authUserThunkCreator());

        Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess());
        })
    };
}


export default appReducer;
