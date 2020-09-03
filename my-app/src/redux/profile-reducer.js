import { usersAPI } from "../api/api"

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

  ],
  newPostText: "Site of HONDA",
  profile:null, 
  status:""
}
  
const profileReducer=(state=initialState, action)=>{
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
            profile:{...state.profile, photos:action.photo}
          };  
     default:
       return state

 }
}
export const newPostActionCreator=(newPostText)=>{
  return{
    type:ADD_POST,
    newPostText
  }
}

const setProfile=(profile)=>{
  
  return{
    type:SET_PROFILE,
    profile
  }
}

const setStatus=(status)=>{
  
  return{
    type:SET_STATUS,
    status
  }
}

const savePhotoSuccess=(photo)=>{
  
  return{
    type:SAVE_PHOTO,
    photo
  }
}

export const deletePost=(postId)=>({type:DELETE_POST,postId});

export const getProfileThunkCreator = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId)
      .then(response => {
        dispatch(setProfile(response.data));
      });
  }
}

export const getProfileStatusThunkCreator = (userId) => {
  return (dispatch) => {
    usersAPI.getStatus(userId)
      .then(response => {
        dispatch(setStatus(response.data));

      });
  }
}

export const updateProfileStatusThunkCreator = (status) => {
  return (dispatch) => {
    usersAPI.updateStatus(status)
      .then(response => { 
        if(response.data.resulCode===0){
          dispatch(setStatus(status));
        }
      });
  }
}

export const savePhoto =   (photo) => {
  return async (dispatch) => {
    let response=await usersAPI.savePhoto(photo)
        if(response.data.resulCode===0){
          dispatch(savePhotoSuccess(response.data.data.photos));
        }
  }
}

export const saveProfile =   (profile) => {
  
  return async (dispatch, getState) => {
    const userId=getState().auth.id
    let response=await usersAPI.saveProfile(profile)
        if(response.data.resulCode===0){
          dispatch(getProfileThunkCreator(userId));
        }
  }
}



export default profileReducer