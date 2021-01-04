import React from 'react';
import MyPosts from './MyPosts'
import { actions } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';


let mapStateToProps=(state)=>{
  return{
    posts:state.profilePage.postMessageData,
    newPostText:state.profilePage.newPostText
  }

}

let mapDispatchToProps=(dispatch)=>{
  return{
    newPost:(newPostText)=>{
      dispatch(actions.newPostActionCreator(newPostText));
      }
  }
}


const MyPostsContainer=connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;