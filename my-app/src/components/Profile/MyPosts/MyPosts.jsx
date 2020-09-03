import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators.js/validator';
import {Textarea} from '../../common/FormsControls/FormsContols'
  
const maxLength10=maxLengthCreator(10);

const MyPosts = (props) => {

  let onNewPost=(values)=>{
  props.newPost(values.newPostText);
 }

  let newPostMessageData=props.posts.map(val=><Post message={val.message}/>)

  return (
    <div className={styles.myPostsTitle}>
      My posts
      <div>
        <MyPostsFormRedux onSubmit={onNewPost}/>
      </div>
      <div className={styles.posts}>

        {newPostMessageData}
     
      </div>

    </div>

  );
}

const MyPostsForm=(props)=>{
  return(
    <form onSubmit={props.handleSubmit}>
      <Field className={styles.textarea} component={Textarea} name="newPostText" placeholder="Post Message"
      validate={[required,maxLength10]}
      />
      <button>Add new Post</button>
    </form>
  )
}

const MyPostsFormRedux=reduxForm({
  form:"postsForm"
})(MyPostsForm)

export default MyPosts;