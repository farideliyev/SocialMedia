import {InferActionsTypes} from "./redux-store";


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

type ActionsType=InferActionsTypes<typeof actions>

 const dialogsReducer=(state=initialState, action:ActionsType):initialStateType=>{
  
   switch (action.type) {
     
     case "SN/DIALOGS/SEND-MESSAGE":
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


export const actions={
    sendMessage:(newMessageBody:string)=>({type:"SN/DIALOGS/SEND-MESSAGE", newMessageBody} as const)
}

// @ts-ignore
export default dialogsReducer;