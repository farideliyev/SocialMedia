import React from "react"
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import styles from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/types/types";

type PropsType={
  profile: ProfileType
}
const ProfileDataForm:React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType>=(props)=>{
    return <form onSubmit={props.handleSubmit}>
    <div>
      <button>save</button>
    </div>
    <div>
      <b>Full Name</b>:<br/>
      <Field component={"input"} name={"fullName"}/>
    </div>
    <div>
      <b>Looking for a job</b>:<Field name="lookingForAJob" component={"input"} type="checkbox"/>
    </div>
      <div>
        <b>My professional skills</b>:<br/><Field name={"lookingForAJobDescription"} component={"textarea"}/>
      </div>
      <div>
        <b>About me</b>:<br/><Field name={"aboutMe"} component={"textarea"}/>
      </div>
    <div>
      <b>Contacts</b>:{Object.keys(props.profile.contacts).map(key=>{
       return <div className={styles.contacts}>
             <b>{key}</b>: <br/><Field placeholder={key} component={"input"} name={"contacts."+key} />
         
       </div>
      })}
    </div>
  </form>
  }


  let ProfileDataFormRedux=reduxForm<ProfileType, PropsType>({
    form: 'profileEdit'
  })(ProfileDataForm)

 export default ProfileDataFormRedux 