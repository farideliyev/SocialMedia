import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
  return ( 
      <div className={styles.item}>
        {props.message}
      </div>

  );
}

export default Post;