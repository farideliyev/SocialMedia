import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatApi, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";
import {message} from "antd";


let initialState = {
    messages: [] as ChatMessageType[]

}

const chatReducer = (state = initialState, action:ActionTypes):initialStateType => {

    switch (action.type) {
        case "SN/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }

        default:
            return state;
    }
}


const actions={
    messagesReceived : (messages: ChatMessageType[]) =>
        ({ type: "SN/chat/MESSAGES_RECEIVED", payload: {messages} } as const),


}
let _newMessageHandler: ( (messages: ChatMessageType[])=>void ) | null = null

const newMessageHandleCreator = (dispatch:Dispatch) =>{
    if(_newMessageHandler === null){
        _newMessageHandler = (messages) =>{
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}
export const startMessagesListening = () : ThunkType => async (dispatch) => {
    chatApi.start()
    chatApi.subscribe(newMessageHandleCreator(dispatch))
}

export const stopMessagesListening = () : ThunkType => async (dispatch) => {
    chatApi.unsubscribe(newMessageHandleCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string) : ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}



export default chatReducer;

type initialStateType=typeof initialState
type ActionTypes=InferActionsTypes<typeof actions>
type ThunkType=BaseThunkType<ActionTypes | FormAction>