import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import { stopSubmit } from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS= "GET_CAPTCHA_URL_SUCCESS";

// export type initialStateType = {
//     id: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean | null
//     captcha: string | null
// }


let initialState = {
    id: null as number |null,
    email: null as string |null,
    login: null as string |null,
    isAuth: false as boolean,
    captcha:null as string | null
}

type initialStateType=typeof initialState

const authReducer = (state = initialState, action:ActionTypes):initialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,

            }
            case GET_CAPTCHA_URL_SUCCESS:
                return {
                    id:"asdsa",
                    ...state,
                    captcha:action.captchaUrl,

    
                }
        //    case LOGIN_USER_DATA:
        //        return {
        //            ...state,
        //            id:action.id,
        //            isAuth: true
        //        }

        default:
            return state;
    }
}

type ActionTypes=setAuthUserDataActionType | getCaptchaUrlActionType


type setAuthUserDataActionDataType={
    id:number | null
    email:string | null
    login: string | null
    isAuth:boolean
}
type setAuthUserDataActionType={
    type: typeof SET_USER_DATA
    data: setAuthUserDataActionDataType
}
const setAuthUserData = (id:number|null, email:string|null, login:string|null, isAuth:boolean) :setAuthUserDataActionType=> ({ type: SET_USER_DATA, data: { id, email, login, isAuth } });

type getCaptchaUrlActionType={
    type:typeof GET_CAPTCHA_URL_SUCCESS
    captchaUrl:string
}
const getCaptchaUrl = (captchaUrl :string):getCaptchaUrlActionType=> ({ type: GET_CAPTCHA_URL_SUCCESS, captchaUrl });
// const LoginAuthUserData=(id)=>({type:LOGIN_USER_DATA, id});

type ThunkType=ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const authUserThunkCreator = () : ThunkType => {
    return async (dispatch) => {
        let response = await authAPI.me()
        if (response.resultCode === ResultCodesEnum.Success) {

            let { id, email, login } = response.data
            dispatch(setAuthUserData(id, email, login, true));

        }

    }
}

export const LoginUserThunkCreator = (email:string, password: string, rememberMe:boolean, captcha:string) :ThunkType => {
    return async (dispatch:any) => {

        let response = await authAPI.login(email, password, rememberMe, captcha)


        if (response.resultCode === ResultCodesEnum.Success) {

            dispatch(authUserThunkCreator());
            

        } else {
            if(response.resultCode===ResultCodeForCaptchaEnum.captchaIsRequired){
                let captchaUrl=await securityAPI.getCaptchaUrl()
               dispatch(getCaptchaUrl(captchaUrl.data.url));
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
            dispatch(setAuthUserData(null, null, null, false));


        }

    }
}

export default authReducer;
