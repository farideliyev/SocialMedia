import { UserType} from "./types/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array <number>, // array for user ids
    filter: {
        term : "",
        friend: null as null | boolean
    }
}


const userReducer = (state = initialState, action:ActionTypes): initialStateType => {
    switch (action.type) {
        case "SN/USERS/FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case"SN/USERS/UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case "SN/USERS/SET_USERS":
            return { ...state, users: action.users }
        case "SN/USERS/SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage }
        case "SN/USERS/SET_FILTER":
            return { ...state, filter: action.payload }
        case "SN/USERS/SET_TOTAL_USERS_COUNT":
            return { ...state, totalUsersCount: action.count }
        case "SN/USERS/TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching }
        case "SN/USERS/FOLLOW_IN_PROGRESS":
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


export const actions={
    followSuccess: (userId:number) => ({ type: "SN/USERS/FOLLOW", userId }as const),


    unFollowSuccess: (userId:number) => ({ type:"SN/USERS/UNFOLLOW", userId }as const),


    setUsers: (users:Array<UserType>)  => ({ type: "SN/USERS/SET_USERS", users }as const),


    setCurrentPage: (currentPage:number) => ({ type: "SN/USERS/SET_CURRENT_PAGE", currentPage }as const),

    setFilter: (filter:FilterType) => ({ type: "SN/USERS/SET_FILTER", payload: filter } as const),


    setTotalUsersCount: (count: number) => ({ type: "SN/USERS/SET_TOTAL_USERS_COUNT", count }as const),


    setToggleIsFetching :(isFetching: boolean) => ({ type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching }as const),


    toggleFollow :(isFetching:boolean, userId:number)  => ({ type: "SN/USERS/FOLLOW_IN_PROGRESS", isFetching, userId }as const)
}

type DispatchType=Dispatch<ActionTypes>;


export const getUsersThunkCreator = (currentPage :number, pageSize:number, filter: FilterType) :ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setToggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));
        usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
            .then( data  => {
                dispatch(actions.setToggleIsFetching(false));
                dispatch(actions.setUsers(data.items));
                dispatch(actions.setTotalUsersCount(data.totalCount))
            });
    }
}

const followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, actionCreator : (userId: number)=>  ActionTypes) => {
     dispatch(actions.toggleFollow(true, userId));
    let response=await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollow(false, userId));
}

export const followThunkCreator = (userId:number) :ThunkType=> {
    return async (dispatch) => {
        let apiMethod=usersAPI.follow.bind(usersAPI)
        let actionCreator=actions.followSuccess;
        await followUnfollowFlow(dispatch,userId, apiMethod, actionCreator)
        
    }
}

export const unfollowThunkCreator = (userId:number): ThunkType => {
    return async (dispatch) => {
        let apiMethod=usersAPI.unfollow.bind(usersAPI);
        let actionCreator=actions.unFollowSuccess;
        await followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);

    }
}

export default userReducer;

export type initialStateType =typeof initialState
export type FilterType = typeof  initialState.filter
type ActionTypes=InferActionsTypes<typeof actions>
type ThunkType=BaseThunkType<ActionTypes>