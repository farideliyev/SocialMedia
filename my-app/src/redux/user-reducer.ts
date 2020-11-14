import { UserType} from "./types/types";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array <number> // array for user ids
}

export type initialStateType =typeof initialState

const userReducer = (state = initialState, action:ActionTypes): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case 'SET_USERS':
            return { ...state, users: action.users }
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage }
        case 'SET_TOTAL_USERS_COUNT':
            return { ...state, totalUsersCount: action.count }
        case 'TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'FOLLOW_IN_PROGRESS':
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

type ActionTypes=InferActionsTypes<typeof actions>

export const actions={
    followSuccess: (userId:number) => ({ type: 'FOLLOW', userId }as const),


    unFollowSuccess: (userId:number) => ({ type: 'UNFOLLOW', userId }as const),


    setUsers: (users:Array<UserType>)  => ({ type: 'SET_USERS', users }as const),


    setCurrentPage: (currentPage:number) => ({ type: 'SET_CURRENT_PAGE', currentPage }as const),


    setTotalUsersCount: (count: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count }as const),


    setToggleIsFetching :(isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching }as const),


    toggleFollow :(isFetching:boolean, userId:number)  => ({ type: 'FOLLOW_IN_PROGRESS', isFetching, userId }as const)
}


type getStateType=()=>AppStateType;
type DispatchType=Dispatch<ActionTypes>;
type ThunkType=ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsersThunkCreator = (currentPage :number, pageSize:number) => {
    return (dispatch:DispatchType, getState:getStateType) => {
        dispatch(actions.setToggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize)
            .then((data: { items: Array<UserType>; totalCount: number; })  => {
                dispatch(actions.setToggleIsFetching(false));
                dispatch(actions.setUsers(data.items));
                dispatch(actions.setTotalUsersCount(data.totalCount))
            });
    }
}


const followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, actionCreator : (userId: number)=>  ActionTypes) => {
     dispatch(actions.toggleFollow(true, userId));
    let response=await apiMethod(userId);
    if (response.data.resultCode === 0) {
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
