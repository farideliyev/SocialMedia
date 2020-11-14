import React from "react";
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import { connect } from "react-redux";
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

let Login: React.FC<MapStateToPropsType & MapDispatchToPropsType>=(props)=>{
    const onSubmit=(formData:LoginFormFormDataValues)=>{
        console.log(formData)
        props.LoginUserThunkCreator(formData.email, formData.password, formData.rememberMe,formData.captcha)
    }
    if(props.isAuth) return <Redirect to={"/profile"}/>
    return <>
             <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    
    </>
}

let ReduxLoginForm=reduxForm<LoginFormFormDataValues, ownPropsType>({
    form: 'login'
  })(LoginForm)

type MapStateToPropsType={
    isAuth:boolean
    captchaUrl: string | null
}

type MapDispatchToPropsType={
    LoginUserThunkCreator:(email:string, password: string, rememberMe:boolean, captcha:string)=>void
}

 let mapStateToProps=(state:AppStateType) :MapStateToPropsType=>({
    isAuth:state.auth.isAuth,
     captchaUrl: state.auth.captcha
 } )

 let connectLoginForm=connect(mapStateToProps,{LoginUserThunkCreator})(Login) 

export  default connectLoginForm