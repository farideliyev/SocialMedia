import {AppStateType} from "./redux-store";

export let selectIsAuth=(state:AppStateType)=>{
    return state.auth.isAuth
}
