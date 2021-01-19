import {PhotosType, PostType, ProfileType} from "./types/types";
import {usersAPI} from "../api/users-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {FormAction} from "redux-form";

let initialState={
  postMessageData: [
    { message: "Salam olsun Civic surenlere", id: 1 },
    { message: "Type R xesteleri necesuz???", id: 2 }

  ] as Array<PostType> ,
  newPostText: "",
  profile: null as ProfileType | null,
  status:""
}

const profileReducer=(state=initialState, action:ActionsType):initialStateType=>{
  switch (action.type){
    case "SN/PROFILE/ADD-POST":
      return{
        ...state,
        postMessageData:[...state.postMessageData, 
          {message: action.newPostText,id: 3}
          ]
      };
     case "SN/PROFILE/SET_PROFILE":
     return{
       ...state,
       profile:action.profile
     };
     case "SN/PROFILE/SET_STATUS":
     return{
       ...state,
       status:action.status
     };
     case "SN/PROFILE/DELETE_POST":
       return{
        ...state,postMessageData:state.postMessageData.filter(p=>p.id!==action.postId)}
        case "SN/PROFILE/SAVE_PHOTO":
          return{
            ...state,
            profile:{...state.profile, photos:action.photo} as ProfileType
          };  
     default:
       return state

 }

}

export const actions={
    newPostActionCreator: (newPostText: string) => ({type: "SN/PROFILE/ADD-POST", newPostText} as const),
    setProfile: (profile: ProfileType) => ({type: "SN/PROFILE/SET_PROFILE", profile} as const),
    setStatus: (status: string) => ({type: "SN/PROFILE/SET_STATUS", status} as const),
    savePhotoSuccess: (photo: PhotosType) => ({type: "SN/PROFILE/SAVE_PHOTO", photo} as const),
    deletePost: (postId: number) => ({type: "SN/PROFILE/DELETE_POST", postId} as const)

}

export const getProfileThunkCreator = (userId: number) :ThunkType => {
  return async (dispatch ) => {
    let response =await usersAPI.getProfile(userId)
      dispatch(actions.setProfile(response))
  }
}

export const getProfileStatusThunkCreator = (userId:number) :ThunkType => {
  return async (dispatch) => {
    let response= await usersAPI.getStatus(userId)
        dispatch(actions.setStatus(response));
  }
}

export const updateProfileStatusThunkCreator = (status: string): ThunkType => {
    return async (dispatch) => {
        try{
            let response = await usersAPI.updateStatus(status)
            if (response.resultCode === 0) {
                dispatch(actions.setStatus(status));
            }
        } catch (error){
            throw new Error(error)
        }

    }
}

export const savePhoto =   (photo:PhotosType)  :ThunkType=>  {
  return async (dispatch) => {
    let response=await usersAPI.savePhoto(photo)
        if(response.resultCode===0){
          dispatch(actions.savePhotoSuccess(response.data.photos));
        }
  }
}

export const saveProfile = (profile:ProfileType) :ThunkType => {
  
  return async (dispatch, getState) => {
    const userId=getState().auth.id
    let response=await usersAPI.saveProfile(profile)
        if(response.data.resultCode===0){
            if(userId!==null){
               await dispatch(getProfileThunkCreator(userId))
            } else{
                throw new Error("userid cant be null")
            }

        }
  }
}


export type initialStateType=typeof initialState
type ActionsType=InferActionsTypes<typeof actions>
type ThunkType=BaseThunkType<ActionsType | FormAction>


export default profileReducer