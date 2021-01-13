import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators.js/validator';
import {Textarea} from '../../common/FormsControls/FormsContols'
import {PostType} from "../../../redux/types/types";
  
const maxLength10=maxLengthCreator(10);

type PropsType={
    posts: Array<PostType>,
    newPost: (newPostText:string)=>void
}
const MyPosts: React.FC<PropsType> = (props) => {

  let onNewPost=(values: MyPostsFormType)=>{
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

type MyPostsFormPropsType={}

type MyPostsFormType={
    newPostText: string
}

const MyPostsForm: React.FC<InjectedFormProps<MyPostsFormType, MyPostsFormPropsType> & MyPostsFormPropsType>=
    (props)=>{
  return(
    <form onSubmit={props.handleSubmit}>
      <Field className={styles.textarea} component={Textarea} name="newPostText" placeholder="Post Message"
      validate={[required,maxLength10]}
      />
      <button>Add new Post</button>
    </form>
  )
}

const MyPostsFormRedux=reduxForm <MyPostsFormType, MyPostsFormPropsType>({
  form:"postsForm"
})(MyPostsForm)

export default MyPosts;