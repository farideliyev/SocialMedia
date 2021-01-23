import {AppStateType} from "./redux-store";

export let getUsers=(state:AppStateType)=>{
 return state.usersPage.users
}
export let getTotalUsersCount=(state:AppStateType)=>{
 return state.usersPage.totalUsersCount
}
export let getPageSize=(state:AppStateType)=>{
 return state.usersPage.pageSize
}
export let getCurrentPage=(state:AppStateType)=>{
 return state.usersPage.currentPage
}
export let getFilter=(state:AppStateType)=>{
 return state.usersPage.filter
}
export let getIsFetching=(state:AppStateType)=>{
 return state.usersPage.isFetching
}
export let getFollowingInProgress=(state:AppStateType)=>{
 return state.usersPage.followingInProgress
}