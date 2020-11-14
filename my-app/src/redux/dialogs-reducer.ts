
const SEND_MESSAGE="SEND-MESSAGE"

type dialogsDataType={
    name:string
    id:number
}

type messageDataType={
    message:string
    id:number
}

let initialState = {

    dialogsData: [

        {name: "Farid", id: 1},
        {name: "Kamran", id: 2},
        {name: "Tural", id: 3},
        {name: "Shamxal", id: 4}
    ] as Array<dialogsDataType>,

    messagesData: [
        {message: "Hi", id: 1},
        {message: "Whats up beaach??", id: 2},
        {message: "Heyooo", id: 2}
    ] as Array<messageDataType>,
    newMessageBody: ""
}

export type initialStateType=typeof initialState

 const dialogsReducer=(state=initialState, action:any):initialStateType=>{
  
   switch (action.type) {
     
     case SEND_MESSAGE:
      let messageBody = action.newMessageBody;
       return{
         ...state,
         newMessageBody:"",
         messagesData:[...state.messagesData, {id: 3, message: messageBody }],
       };
     default:
       return state
   }
 }
 type sendMessageCreatorType={
    type: typeof SEND_MESSAGE
     newMessageBody:string
 }

export const sendMessageCreator=(newMessageBody:string): sendMessageCreatorType=>{
  
  return{
    type:SEND_MESSAGE,
    newMessageBody
  }
}


// @ts-ignore
export default dialogsReducer;