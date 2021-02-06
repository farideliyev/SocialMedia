let subscribers = {
    "messages-received": [] as MessagesReceivedSubscribersType[],
    "status-changed": [] as StatusChangedSubscribersType[]
}


type EventsNamesType =  "messages-received" | "status-changed"
let ws: WebSocket | null = null

let closeHandler = () => {
    setTimeout(createChannel, 3000)
    notifySubscribersAboutStatus("pending")
    console.log("Closed ws")
}

let messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)

    subscribers["messages-received"].forEach(s => s(newMessages))
    console.log(subscribers)


};

let openHandler = () => {
    notifySubscribersAboutStatus("ready")
};

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
}

const notifySubscribersAboutStatus = (status: StatusType)=> {
    subscribers["status-changed"].forEach(s=>s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()
    notifySubscribersAboutStatus("pending")
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("open", openHandler)
}

export const chatApi = {
    start() {

        createChannel()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType ,callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {

        // @ts-ignore
        subscribers[eventName].push(callback)

        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)

        }

    },

    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: 2,
    userName: string
}
type MessagesReceivedSubscribersType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscribersType = (status: StatusType) => void
export type StatusType = "pending" | "ready";