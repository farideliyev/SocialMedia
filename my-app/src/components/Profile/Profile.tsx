import React from 'react';
import styles from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
  return (
    <div className={styles.content}>
      <ProfileInfo profile={props.profile} status={props.status} 
      updateStatus={props.updateStatus}
      isOwner={props.isOwner}
      savePhoto={props.savePhoto}
      saveProfile={props.saveProfile}
      
      />
       
      <MyPostsContainer store={props.store}
              />
              
    </div>


  );
}

export default Profile;