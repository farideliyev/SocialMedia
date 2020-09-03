import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { followThunkCreator, unfollowThunkCreator,
    toggleFollow, 
    getUsersThunkCreator,
    onPageChangedThunkCreator

} from "../../redux/user-reducer";
import Preloader from "../common/Preloader";
import { compose } from "redux";
import { getUsers, getTotalUsersCount, getPageSize, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/users-selectors";


class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
  }

    onPageChanged = (pageNumber) => {
        this.props.onPageChangedThunkCreator(pageNumber, this.props.pageSize)

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
                    isFetching={this.props.isFetching}
                    followingInProgress={this.props.followingInProgress}
                    toggleFollow={this.props.toggleFollow}

                    

      
      />
      </>
  }
}

let mapStateProps=(state)=>{
    return{
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching:getIsFetching(state),
        followingInProgress:getFollowingInProgress(state)

    }
}

// let mapDispatchToProps=(dispatch)=>{
//     return{
//         follow:(userId)=>{
//           dispatch(followAC(userId));
//         },
//         unfollow:(userId)=>{
//             dispatch(unFollowAC(userId));
//           },
//           setUsers:(users)=>{
//             dispatch(setUsersAC(users));
//           },
//           setCurrentPage:(pageNumber)=>{
//             dispatch(setCurrentPageAC(pageNumber));
//           },
//           setTotalUsersCount:(totalCount)=>{
//             dispatch(setTotalUsersCountAC(totalCount));
//           },
//           setToggleFetching:(isFetching)=>{
//             dispatch(setToggleIsFetchingAC(isFetching));
//           }
//     }
// }


export default compose(

  connect(mapStateProps, 
    {followThunkCreator,unfollowThunkCreator,toggleFollow,getUsersThunkCreator,onPageChangedThunkCreator})
)(UsersContainer)