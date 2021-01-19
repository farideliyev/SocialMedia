import React from 'react';
import Header, {MapStatePropsType, MapDispatchPropsType} from './Header';
import { connect } from 'react-redux';
import {LogoutUserThunkCreator } from '../../redux/auth-reducer';
import {AppStateType} from "../../redux/redux-store";



class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {
 
  render() {
    return <>
      <Header {...this.props} />
    </>
  }
}

let mapStateToProps=(state: AppStateType)=>({
  isAuth:state.auth.isAuth,
  login:state.auth.login

 
})
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps,
    {logout:LogoutUserThunkCreator})
(HeaderContainer);