import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import {
    followThunkCreator, unfollowThunkCreator,
    getUsersThunkCreator, FilterType,


} from "../../redux/user-reducer";
import Preloader from "../common/Preloader";
import { compose } from "redux";
import {
    getUsers,
    getTotalUsersCount,
    getPageSize,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress,
    getFilter
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";
import {UserType} from "../../redux/types/types";

type MapStateToPropsType={
    currentPage:number
    pageSize:number
    totalUsersCount:number
    users:Array<UserType>
    isFetching:boolean
    followingInProgress:Array<number>
    filter: FilterType
}
type MapDispatchToPropsType={
    unfollowThunkCreator:(userId:number)=>void
    followThunkCreator:(userId:number)=>void
    getUsersThunkCreator:(currentPage:number, pageSize:number, filter: FilterType )=>void
}

type PropsType= MapDispatchToPropsType & MapStateToPropsType

 class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize, this.props.filter)
  }

    onPageChanged = (pageNumber:number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize, this.props.filter)

  }

  onFilterChanged = (filter: FilterType) => {
     const {pageSize} =this.props
      this.props.getUsersThunkCreator(1, pageSize, filter)
  }

  render() {
      return <>
      {this.props.isFetching ? <Preloader/>:null}
      <Users totalUsersCount={this.props.totalUsersCount}
                    users={this.props.users}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    onFilterChanged={this.onFilterChanged}
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
        filter: getFilter(state),
        isFetching:getIsFetching(state),
        followingInProgress:getFollowingInProgress(state)

    }
}


export default compose<React.ComponentType>(

  connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateProps,
    {followThunkCreator,unfollowThunkCreator, getUsersThunkCreator})

)(UsersContainer)