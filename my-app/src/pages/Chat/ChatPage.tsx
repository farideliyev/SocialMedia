import React, {useEffect, useRef, useState} from "react";
import { ChatMessageAPIType } from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

const ChatPage: React.FC = () =>{
    return <div>
        <Chat/>
    </div>
}


const Chat = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(startMessagesListening())

      return ()=>{
        dispatch(stopMessagesListening())
      }

    }, [])


    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC<{}> = React.memo(() =>{

    const messages = useSelector((state :AppStateType)=> state.chat.messages )
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(()=>{
        if (isAutoScroll) messagesAnchorRef.current?.scrollIntoView({behavior:"smooth"})

    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        console.log(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight))
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight)<300)
        {
            setIsAutoScroll(true)
        } else {
            setIsAutoScroll(false)
        }
    }
    return <div style={{height: "400px", overflow: "auto"}} onScroll={scrollHandler}>
        {messages.map((m, index)=><Message message={m} key={m.id}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
})

const Message: React.FC<{message: ChatMessageAPIType}> = ({message}) =>{


    return <div>
      <img src={message.photo} style={{width: "30px"}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>

    </div>
}



const AddMessageForm: React.FC<{}> = ({}) =>{
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const status = useSelector((state:AppStateType) =>state.chat.status )

    const sendMessageHandler = () =>{
        if(message) {
            dispatch(sendMessage(message))
            setMessage("")
        }

    }

    return <div>
        <div>
            <textarea onChange={e=>setMessage(e.currentTarget.value)} value={message}/>
        </div>
       <div>
           <button disabled={status === "pending"} onClick={sendMessageHandler}>Send</button>
       </div>

    </div>
}

export default ChatPage