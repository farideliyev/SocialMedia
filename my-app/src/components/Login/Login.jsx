import React from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { LoginUserThunkCreator } from "../../redux/auth-reducer";
import { Input } from "../common/FormsControls/FormsContols";
import { required } from "../../utils/validators.js/validator";
import styles from "../../components/common/FormsControls/FormControls.module.css"
import { Redirect } from "react-router-dom";

let LoginForm=(props)=>{
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
            {props.capcthaUrl&& <img src={props.capcthaUrl} alt="captcha"/>}
            {props.capcthaUrl&& <div><Field name="captcha" component={Input} validate={[required]}/></div>}
            {props.error && <div className={styles.formSummaryError}>{props.error}</div>}
        <div>
            <button>Log in</button>
        </div>
    </form>)  
}

let Login=(props)=>{
    const onSubmit=(formData)=>{
        console.log(formData)
        props.LoginUserThunkCreator(formData.email, formData.password, formData.rememberMe,formData.captcha)
    }
    if(props.isAuth) return <Redirect to={"/profile"}/>
    return <>
             <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit} capcthaUrl={props.capcthaUrl} />
    
    </>
}

let ReduxLoginForm=reduxForm({
    form: 'login'
  })(LoginForm)

 let mapStateToProps=(state)=>({
    isAuth:state.auth.isAuth,
    capcthaUrl: state.auth.captcha
 } )

 let connectLoginForm=connect(mapStateToProps,{LoginUserThunkCreator})(Login) 

export  default connectLoginForm