import {PhotosType, PostType, ProfileType} from "./types/types";
import {usersAPI} from "../api/users-api";

// const UPDATE_POST="UPDATE-POST";
const ADD_POST="ADD-POST"
const SET_PROFILE="SET_PROFILE"
const SET_STATUS="SET_STATUS"
const DELETE_POST="DELETE_POST"
const SAVE_PHOTO="SAVE_PHOTO"



let initialState={
  postMessageData: [
    { message: "Salam olsun Civic surenlere", id: 1 },
    { message: "Type R xesteleri necesuz???", id: 2 }

  ] as Array<PostType> ,
  newPostText: "",
  profile: null as ProfileType | null,
  status:""
}

export type initialStateType=typeof initialState

  
const profileReducer=(state=initialState, action:any):initialStateType=>{
  switch (action.type){
    case ADD_POST:
      return{
        ...state,
        postMessageData:[...state.postMessageData, 
          {message: action.newPostText,id: 3}
          ],
          newPostText:""
      };
     case SET_PROFILE:
     return{
       ...state,
       profile:action.profile
     };
     case SET_STATUS:
     return{
       ...state,
       status:action.status
     };
     case DELETE_POST:
       return{
        ...state,postMessageData:state.postMessageData.filter(p=>p.id!==action.postId)}
        case SAVE_PHOTO:
          return{
            ...state,
            profile:{...state.profile, photos:action.photo} as ProfileType
          };  
     default:
       return state

 }

}
type newPostActionCreatorType={
    type: typeof ADD_POST,
    newPostText:string
}
export const newPostActionCreator=(newPostText:string) : newPostActionCreatorType=>{
  return{
    type:ADD_POST,
    newPostText
  }
}

type setProfileType={
    type: typeof SET_PROFILE,
    profile:ProfileType
}
const setProfile=(profile:ProfileType) : setProfileType=>{
  
  return{
    type:SET_PROFILE,
    profile
  }
}

type setStatusType={
    type: typeof SET_STATUS,
    status:string
}
const setStatus=(status:string):setStatusType=>{
  
  return{
    type:SET_STATUS,
    status
  }
}


type savePhotoSuccessType={
    type: typeof SAVE_PHOTO,
    photo:PhotosType
}
const savePhotoSuccess=(photo:PhotosType): savePhotoSuccessType=>{
  
  return{
    type:SAVE_PHOTO,
    photo
  }
}

type deletePostType={
    type: typeof DELETE_POST,
    postId:number
}
export const deletePost=(postId: number) :deletePostType=>({type:DELETE_POST,postId});

export const getProfileThunkCreator = (userId: number) => {
  return (dispatch :any) => {
    usersAPI.getProfile(userId)
      .then((response: { data: ProfileType; }) => {
        dispatch(setProfile(response.data));
      });
  }
}

export const getProfileStatusThunkCreator = (userId:number) => {
  return (dispatch:any) => {
    usersAPI.getStatus(userId)
      .then((response: { data: string; }) => {
        dispatch(setStatus(response.data));

      });
  }
}

export const updateProfileStatusThunkCreator = (status: string) => {
  return (dispatch: any) => {
    usersAPI.updateStatus(status)
      .then((response: { data: { resultCode: number; }; }) => {
        if(response.data.resultCode===0){
          dispatch(setStatus(status));
        }
      });
  }
}

export const savePhoto =   (photo:PhotosType) => {
  return async (dispatch:any) => {
    let response=await usersAPI.savePhoto(photo)
        if(response.data.resulCode===0){
          dispatch(savePhotoSuccess(response.data.data.photos));
        }
  }
}

export const saveProfile = (profile:ProfileType) => {
  
  return async (dispatch:any, getState:any) => {
    const userId=getState().auth.id
    let response=await usersAPI.saveProfile(profile)
        if(response.data.resulCode===0){
          dispatch(getProfileThunkCreator(userId));
        }
  }
}

export default profileReducer