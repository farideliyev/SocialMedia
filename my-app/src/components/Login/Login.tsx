import React from "react";
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {connect, useDispatch, useSelector} from "react-redux";
import { LoginUserThunkCreator } from "../../redux/auth-reducer";
import { Input } from "../common/FormsControls/FormsContols";
import { required } from "../../utils/validators.js/validator";
import styles from "../../components/common/FormsControls/FormControls.module.css"
import { Redirect } from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type ownPropsType={
    captchaUrl:string | null
}
let LoginForm: React.FC<InjectedFormProps<LoginFormFormDataValues, ownPropsType> & ownPropsType> =(props)=>{
    return (
     <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder="Login" name={"email"} component={Input} validate={[required]}/>
        </div>
        <div>
            <Field placeholder="Password"  name={"password"} component={Input}/>
        </div>
        <div>
            <Field  type="checkbox" name={"rememberMe"} component={Input} /> remember me
        </div>
            {props.captchaUrl&& <img src={props.captchaUrl} alt="captcha"/>}
            {props.captchaUrl&& <div><Field name="captcha" component={Input} validate={[required]}/></div>}
            {props.error && <div className={styles.formSummaryError}>{props.error}</div>}
        <div>
            <button>Log in</button>
        </div>
    </form>)  
}

type LoginFormFormDataValues={
    email:string
    password: string
    rememberMe:boolean
    captcha:string
}

export let Login: React.FC=()=>{

    const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
    const captchaUrl = useSelector((state:AppStateType)=>state.auth.captcha)
    const dispatch = useDispatch()

    const onSubmit=(formData:LoginFormFormDataValues)=>{
        dispatch(LoginUserThunkCreator(formData.email, formData.password, formData.rememberMe,formData.captcha))
    }
    if(isAuth) return <Redirect to={"/profile"}/>
    return <>
             <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    
    </>
}

let ReduxLoginForm=reduxForm<LoginFormFormDataValues, ownPropsType>({
    form: 'login'
  })(LoginForm)




