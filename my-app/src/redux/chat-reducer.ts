import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatApi, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {message} from "antd";
import {v1} from "uuid"


type ChatMessageType = ChatMessageAPIType & {id:string}
let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType

}

const chatReducer = (state = initialState, action:ActionTypes):initialStateType => {

    switch (action.type) {
        case "SN/chat/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m=>({...m, id: v1()}))]
                    .filter((m, i, arr)=>i>=arr.length-100)
            }

        case "SN/chat/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state;
    }
}


const actions={
    messagesReceived : (messages: ChatMessageAPIType[]) =>
        ({ type: "SN/chat/MESSAGES_RECEIVED", payload: {messages} } as const),
    statusReceived : (status: StatusType) =>
        ({ type: "SN/chat/STATUS_CHANGED", payload: {status} } as const),


}
let _newMessageHandler: ( (messages: ChatMessageAPIType[])=>void ) | null = null
let _statusChangeHandler: ( (status: StatusType)=>void ) | null = null

const newMessageHandleCreator = (dispatch:Dispatch) =>{
    if(_newMessageHandler === null){
        _newMessageHandler = (messages) =>{
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

const statusChangeHandlerCreator = (dispatch:Dispatch) =>{
    if(_statusChangeHandler === null){
        _statusChangeHandler = (status) =>{
            dispatch(actions.statusReceived(status))
        }
    }

    return _statusChangeHandler
}

export const startMessagesListening = () : ThunkType => async (dispatch) => {
    chatApi.start()

    chatApi.subscribe("messages-received", newMessageHandleCreator(dispatch))
    chatApi.subscribe("status-changed", statusChangeHandlerCreator(dispatch))
}

export const stopMessagesListening = () : ThunkType => async (dispatch) => {
    chatApi.unsubscribe("messages-received",newMessageHandleCreator(dispatch))
    chatApi.unsubscribe("status-changed", statusChangeHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string) : ThunkType => async (dispatch) => {
    chatApi.sendMessage(message)
}



export default chatReducer;

type initialStateType=typeof initialState
type ActionTypes=InferActionsTypes<typeof actions>
type ThunkType=BaseThunkType<ActionTypes | FormAction>