import { act } from "react-dom/test-utils";
import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"

let store={
   _state:{
    profilePage: {
      postMessageData: [
        { message: "Salam olsun Civic surenlere", id: 1 },
        { message: "Type R xesteleri necesuz???", id: 2 }
  
      ],
      newPostText: "Site of HONDA"
  
    },
        
     dialogsPage:{
         
        dialogsData:[
    
          {name:"Farid",  id:1},
          {name:"Kamran", id:2},
          {name:"Tural",  id:3},
          {name:"Shamxal",id:4}   
         ],
        messagesData:[
      {message: "Hi",  id:1},
      {message: "Whats up beaach??",  id:2},
      {message: "Heyooo",  id:2}
      ],
      newMessageBody:""
    }
    
    },
    getState(){
      return this._state;
    },
    _callSubscriber(){
      console.log("Some text")
    },
    subscribe(observer){
      this._callSubscriber=observer;
    },
    
  dispatch(action){ 
    this._state.profilePage=profileReducer(this._state.profilePage, action);
    this._state.dialogsPage=dialogsReducer(this._state.dialogsPage, action)
    this._callSubscriber(this.state);
  
  }
   
}







export default store;