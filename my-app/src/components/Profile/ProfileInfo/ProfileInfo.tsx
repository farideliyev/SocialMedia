import React, { useState } from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader';
import ProfileStatusWithHook from './ProfileStatusWithHook';
import userPhoto from "../../../assets/images/userPhoto.png"
import ProfileDataForm from './ProfileDataForm';
import {ProfileType} from "../../../redux/types/types";


type PropsType={
    profile: ProfileType
    savePhoto: (file: File)=>void,
    saveProfile: (profile: ProfileType)=>void
    isOwner: boolean
    status: string,
    updateStatus: (status: string)=>void


}

const ProfileInfo: React.FC<PropsType>  = (props) => {
  let [editMode, setEditMode]=useState(false);

  if (!props.profile) {
    return <Preloader />
  };


  const onFileUploaded = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  const onSubmit=(profile)=>{
    console.log(profile);
    props.saveProfile(profile)
    setEditMode(false)
  }

  return (
    <div>
      <div>
        <img src='https://s.auto.drom.ru/i24202/c/photos/fullsize/honda/civic_type_r/honda_civic_type_r_640063.jpg' />
      </div>
      <div className={styles.descriptionBlock}>
        <img src={props.profile.photos.large || userPhoto} alt="acili" />

        {props.isOwner &&
          <div className={styles.uploadFileBlock}>
            <input type="file" onChange={onFileUploaded} />
          </div>
        }
 
       {editMode 
       ? <ProfileDataForm profile={props.profile} initialValues={props.profile} onSubmit={onSubmit} />
       :<ProfileData  profile={props.profile} isOwner={props.isOwner} 
        goToEditMode={()=>{setEditMode(true)}}/> 
       }
        <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus} />

      </div>

    </div>


  );
}

const ProfileData=(props)=>{
  return <div>
          {props.isOwner&&
          <div>
            <button onClick={props.goToEditMode}>Edit</button>
          </div>}
          <div>
            <b>Full Name</b>:{props.profile.fullName}
          </div>
          <div>
            <b>Looking for a job</b>:{props.profile.lookingForAJob ? "yes" : "no"}
          </div>
          {props.profile.lookingForAJob &&
            <div>
              <b>My professional skills</b>:{props.profile.lookingForAJobDescription}
            </div>
          }
          <div>
            <b>About me</b>:{props.profile.aboutMe}
          </div>
          <div>
            <b>Contacts</b>:{Object.keys(props.profile.contacts).map(key=>{
             return <Contact contactTitle={key} contactValue={props.profile.contacts[key]}/>
            })}
          </div>
        </div>
}




const Contact=({contactTitle, contactValue})=>{
  return <div className={styles.contacts}>
    <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo;