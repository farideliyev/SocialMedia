import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";


let initialState = {
    id: null as number |null,
    email: null as string |null,
    login: null as string |null,
    isAuth: false as boolean,
    captcha:null as string | null
}

const authReducer = (state = initialState, action:ActionTypes):initialStateType => {

    switch (action.type) {
        case "SN/auth/SET_USER_DATA":
            return {
                ...state,
                ...action.data,

            }
            case "SN/auth/GET_CAPTCHA_URL_SUCCESS":
                return {
                    ...state,
                    captcha:action.captchaUrl,

    
                }

        default:
            return state;
    }
}


const actions={
    setAuthUserData : (id:number|null, email:string|null, login:string|null, isAuth:boolean) =>
        ({ type: "SN/auth/SET_USER_DATA", data: { id, email, login, isAuth } } as const),

    getCaptchaUrl :(captchaUrl :string)=> ({ type: "SN/auth/GET_CAPTCHA_URL_SUCCESS", captchaUrl } as const)
}

export const authUserThunkCreator = () : ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.me()
        if (response.resultCode === ResultCodesEnum.Success) {

            let { id, email, login } = response.data
            dispatch(actions.setAuthUserData(id, email, login, true));

        }

    }
}

export const LoginUserThunkCreator = (email:string, password: string, rememberMe:boolean, captcha:string) :ThunkType => {
    return async (dispatch) => {

        let response = await authAPI.login(email, password, rememberMe, captcha)


        if (response.resultCode === ResultCodesEnum.Success) {

            await dispatch(authUserThunkCreator());
            

        } else {
            if(response.resultCode===ResultCodeForCaptchaEnum.captchaIsRequired){
                let captchaUrl=await securityAPI.getCaptchaUrl()
               dispatch(actions.getCaptchaUrl(captchaUrl.url));
            }
            else{
                let error = response.messages[0]
                dispatch(stopSubmit("login", { _error: error }))      
            }
            
        }

    }
}


export const LogoutUserThunkCreator = () :ThunkType => {
    return async (dispatch:any) => {

        let response = await authAPI.logout()

        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false));


        }

    }
}

export default authReducer;

type initialStateType=typeof initialState
type ActionTypes=InferActionsTypes<typeof actions>
type ThunkType=BaseThunkType<ActionTypes | FormAction>