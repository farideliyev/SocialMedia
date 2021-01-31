import React, {useEffect, useState} from "react";

const ChatPage: React.FC = () =>{
    return <div>
        <Chat/>
    </div>
}


const Chat = () =>{
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(()=>{
      let ws: WebSocket
        const closeHandler = ()=>{
            setTimeout(createChannel, 3000)
            console.log("Closed ws")
        }
       function createChannel(){
              debugger
              ws?.removeEventListener("close", closeHandler )
               ws?.close()

            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
           setWsChannel(ws)
           ws.addEventListener("close", closeHandler)
       }
       createChannel();

      return ()=>{
          ws.removeEventListener("close", closeHandler)
          ws.close()
      }

    }, [])


    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: React.FC<{ wsChannel: WebSocket | null}> = ({wsChannel}) =>{

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(()=>{
        let messageHandler = (e:MessageEvent)=>{
            setMessages((prevMessages)=>[...prevMessages, ...JSON.parse(e.data)])

        };
        wsChannel?.addEventListener("message", messageHandler)

        return ()=>{
            wsChannel?.removeEventListener("message", messageHandler)
        }

    }, [wsChannel])

    return <div style={{height: "400px", overflow: "auto"}}>
        {messages.map((m, index)=><Message message={m} key={index}/>)}

    </div>
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) =>{

    return <div>
      <img src={message.photo} style={{width: "30px"}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}



const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) =>{
    const [message, setMessage] = useState("")
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(()=>{
        let openHandler = () => {
            setReadyStatus("ready")
        };
        wsChannel?.addEventListener("open", openHandler)

        return ()=>{
            wsChannel?.removeEventListener("open", openHandler)
        }
    })
    const sendMessage = () =>{
        if(message) {
            wsChannel?.send(message)
            setMessage("")
        }

    }

    return <div>
        <div>
            <textarea onChange={e=>setMessage(e.currentTarget.value)} value={message}/>
        </div>
       <div>
           <button onClick={sendMessage} disabled={wsChannel ==null || readyStatus!=="ready"}>Send</button>
       </div>

    </div>
}

type ChatMessageType = {
    message: string,
    photo: string,
    userId: 2,
    userName: string
}
export default ChatPage