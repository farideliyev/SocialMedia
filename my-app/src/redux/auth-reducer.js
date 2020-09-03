import { authAPI,securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCES= "GET_CAPTCHA_URL_SUCCES";



let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captcha:null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,

            }
            case GET_CAPTCHA_URL_SUCCES:
                return {
                    ...state,
                    captcha:action.captchaUrl
    
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


const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, data: { id, email, login, isAuth } });
const getCaptchaUrl = (captchaUrl )=> ({ type: GET_CAPTCHA_URL_SUCCES, captchaUrl });
// const LoginAuthUserData=(id)=>({type:LOGIN_USER_DATA, id});

export const authUserThunkCreator = () => {
    return async (dispatch) => {
        let response = await authAPI.me()
        if (response.data.resultCode === 0) {

            let { id, email, login } = response.data.data
            dispatch(setAuthUserData(id, email, login, true));

        }

    }
}

export const LoginUserThunkCreator = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {

        let response = await authAPI.login(email, password, rememberMe, captcha)


        if (response.data.resultCode === 0) {

            dispatch(authUserThunkCreator());
            

        } else {
            if(response.data.resultCode===10){
                let captchaUrl=await securityAPI.getCaptchaUrl()
               dispatch(getCaptchaUrl(captchaUrl.data.url));
            }
            else{
                let error = response.data.messages[0]
                dispatch(stopSubmit("login", { _error: error }))      
            }
            
        }

    }
}


export const LogoutUserThunkCreator = () => {
    return async (dispatch) => {

        let response = await authAPI.logout()

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));


        }

    }
}

export default authReducer;
