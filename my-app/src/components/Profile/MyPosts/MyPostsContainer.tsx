import React from 'react';
import MyPosts, {MapDispatchPropsType, MapStatePropsType} from './MyPosts'
import { actions } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps=(state: AppStateType)=>{
  return{
    posts:state.profilePage.postMessageData
  }

}


const MyPostsContainer=connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
  newPost:actions.newPostActionCreator
})(MyPosts)

export default MyPostsContainer;