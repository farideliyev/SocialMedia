import React from 'react';
import styles from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfileType} from "../../redux/types/types";

type PropsType={
    profile: ProfileType | null
    savePhoto: (file: File)=>void,
    saveProfile: (profile: ProfileType)=>void
    isOwner: boolean
    status: string,
    updateStatus: (status: string)=>void
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.content}>
      <ProfileInfo profile={props.profile} status={props.status} 
      updateStatus={props.updateStatus}
      isOwner={props.isOwner}
      savePhoto={props.savePhoto}
      saveProfile={props.saveProfile}
      
      />
       
      <MyPostsContainer/>
              
    </div>


  );
}

export default Profile;