import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { followThunkCreator, unfollowThunkCreator,
    getUsersThunkCreator,


} from "../../redux/user-reducer";
import Preloader from "../common/Preloader";
import { compose } from "redux";
import { getUsers, getTotalUsersCount, getPageSize, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../redux/types/types";

type MapStateToPropsType={
    currentPage:number
    pageSize:number
    totalUsersCount:number
    users:Array<UserType>
    isFetching:boolean
    followingInProgress:Array<number>
}
type MapDispatchToPropsType={
    unfollowThunkCreator:(userId:number)=>void
    followThunkCreator:(userId:number)=>void
    getUsersThunkCreator:(currentPage:number, pageSize:number)=>void
}

type PropsType= MapDispatchToPropsType & MapStateToPropsType
class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
  }

    onPageChanged = (pageNumber:number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)

  }

  render() {
      return <>
      {this.props.isFetching ? <Preloader/>:null}
      <Users totalUsersCount={this.props.totalUsersCount}
                    users={this.props.users}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    unfollowThunkCreator={this.props.unfollowThunkCreator}
                    followThunkCreator={this.props.followThunkCreator}
                    followingInProgress={this.props.followingInProgress}
      />
      </>
  }
}

let mapStateProps=(state:AppStateType)=>{
    return{
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching:getIsFetching(state),
        followingInProgress:getFollowingInProgress(state)

    }
}


export default compose<React.ComponentType>(

  connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateProps,
    {followThunkCreator,unfollowThunkCreator,getUsersThunkCreator})
)(UsersContainer)