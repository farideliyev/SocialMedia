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


class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.autorizedUserId;
      if (!userId) {
        this.props.history.push("/login")
      }
    }
    this.props.getProfileThunkCreator(userId);
    this.props.getProfileStatusThunkCreator(userId);
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps) {

    if(this.props.match.params.userId!==prevProps.match.params.userId)
    this.refreshProfile()
  }

  render() {

    return (
      < div >
        <Profile {...this.props} profile={this.props.profile} status={this.props.status}
          updateStatus={this.props.updateProfileStatusThunkCreator}
          isOwner={!this.props.match.params.userId}

        />
      </div >
    )
  }

}


let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  autorizedUserId: state.auth.id
});


export default compose(
  connect(mapStateToProps,
    { getProfileThunkCreator, getProfileStatusThunkCreator, updateProfileStatusThunkCreator, 
      savePhoto, saveProfile}),
  withRouter,

)(ProfileContainer)