import React from 'react';
import Profile from './Profile';
import {
  getProfileThunkCreator,
  getProfileStatusThunkCreator,
  updateProfileStatusThunkCreator,
  savePhoto, saveProfile
} from '../../redux/profile-reducer';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../redux/types/types";
import {RouteComponentProps} from "react-router-dom"


type MapStatePropsType= ReturnType<typeof mapStateToProps>
type DispatchProps={
   getProfileThunkCreator:(userId: number)=>void
   getProfileStatusThunkCreator:(userId: number)=>void
   updateProfileStatusThunkCreator:(status: string)=>void
   savePhoto:(file: File)=>void
   saveProfile:(profile: ProfileType)=>void
}
type PropsType= MapStatePropsType & DispatchProps & RouteComponentProps<PathParamsType>

type PathParamsType = {
    userId: string
}


class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
      debugger

    let userId: number | null= +this.props.match.params.userId
    if (!userId) {
      userId =  this.props.autorizedUserId;
      if (!userId) {
        this.props.history.push("/login")
      }
    }
    if(!userId){
        console.log('ID should exist in URL')
    }else{
        debugger
        this.props.getProfileThunkCreator(userId);
        this.props.getProfileStatusThunkCreator(userId);
    }

  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps:PropsType) {

    if(this.props.match.params.userId!==prevProps.match.params.userId)
    this.refreshProfile()
  }

  render() {

    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status}
          updateStatus={this.props.updateProfileStatusThunkCreator}
          isOwner={!this.props.match.params.userId}

        />
      </div >
    )
  }

}


let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  autorizedUserId: state.auth.id
});


export default compose<React.ComponentType>(
  connect(mapStateToProps,
    { getProfileThunkCreator, getProfileStatusThunkCreator, updateProfileStatusThunkCreator, 
      savePhoto, saveProfile}),
  withRouter,

)(ProfileContainer)