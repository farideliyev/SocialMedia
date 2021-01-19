import React from 'react';
import styles from './Post.module.css';
type PostType={
    message: string
}
const Post:React.FC<PostType>= (props) => {
  return ( 
      <div className={styles.item}>
        {props.message}
      </div>

  );
}

export default Post;