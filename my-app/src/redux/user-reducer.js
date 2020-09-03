import { act } from "react-dom/test-utils"
import { usersAPI } from "../api/api"

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const FOLLOW_IN_PROGRESS = "FOLLOW_IN_PROGRESS"

let initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case FOLLOW_IN_PROGRESS:
            return {
                ...state,
                followingInProgress:action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id != action.userId)
                }


        default:
            return state;
    }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unFollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count });
export const setToggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollow = (isFetching, userId) => ({ type: FOLLOW_IN_PROGRESS, isFetching, userId });


export const getUsersThunkCreator = (currentPage,pageSize) => {
    return (dispatch) => {
        dispatch(setToggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setUsers(data.items));
                dispatch(setToggleIsFetching(false));
                dispatch(setTotalUsersCount(data.totalCount))
            });
    }
}

export const onPageChangedThunkCreator = (pageNumber, pageSize) => {
    return (dispatch) => {
        dispatch(setToggleIsFetching(true));
        dispatch(setCurrentPage(pageNumber));
        usersAPI.getUsers(pageNumber, pageSize)
            .then(data => {
                dispatch(setToggleIsFetching(false));
                dispatch(setUsers(data.items));
            })
    }
}


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
     dispatch(toggleFollow(true, userId));
    let response=await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollow(false, userId));
}

export const followThunkCreator = (userId) => {
    return async (dispatch) => {
        let apiMethod=usersAPI.follow.bind(usersAPI)
        let actionCreator=followSuccess;
        followUnfollowFlow(dispatch,userId, apiMethod, actionCreator)
        
    }
}


export const unfollowThunkCreator = (userId) => {
    return async (dispatch) => {
        let apiMethod=usersAPI.unfollow.bind(usersAPI);
        let actionCreator=unFollowSuccess;
        followUnfollowFlow(dispatch,userId, apiMethod, actionCreator);

    }
}
export default userReducer;
