
const SEND_MESSAGE="SEND-MESSAGE"

let initialState={ 
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

 const dialogsReducer=(state=initialState, action)=>{
  
   switch (action.type) {
     
     case SEND_MESSAGE:
      let messageBody = action.newMessageBody;
       return{
         ...state,
         newMessageBody:"",
         messagesData:[...state.messagesData, {id: 3, message: messageBody }]
       };
     default:
       return state
   }
 }


export const sendMessageCreator=(newMessageBody)=>{
  
  return{
    type:SEND_MESSAGE,
    newMessageBody
    
  }
}




export default dialogsReducer;
