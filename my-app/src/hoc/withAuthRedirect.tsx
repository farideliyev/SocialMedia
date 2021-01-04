import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppStateType} from "../redux/redux-store";


let mapStateToPropsForRedirect=(state :AppStateType)=>({
    isAuth: state.auth.isAuth
  });

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>){

    function RedirectComponent(props: WCP) {

        if (!props.isAuth) return <Redirect to='/login'/>
        return <WrappedComponent {...props}/>
    }

    let ConnectedAuthRedirectComponent=connect(mapStateToPropsForRedirect)(RedirectComponent)
    return  ConnectedAuthRedirectComponent;
}