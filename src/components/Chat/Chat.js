import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'

let socket

const Chat = ({location}) =>{
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const [message,setmessage] = useState([])
    const [messages,setmessages] = useState([])
    const ENDPOINT = 'https://areact-chat-application.herokuapp.com/'

    useEffect(()=>{
        const {name,room} = queryString.parse(location.search)
        setName(name)
        setRoom(room)

        socket = io(ENDPOINT)
        socket.emit('join',{name,room},()=>{

        })

        return()=>{
            socket.emit('disconnect')
            socket.off()
        }

        console.log(socket)
    },[ENDPOINT,location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
            setmessages([...messages,message])
        })
    },[messages])

    const sendMessage = (event) =>{
        event.preventDefault()
        if(message){
            socket.emit('sendMessage',message,()=> setmessage(''))
        }
    }

    console.log(message,messages)

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setmessage} sendMessage={sendMessage} />
                {/* <input 
                value={message} 
                onChange={(event)=> setmessage(event.target.value)}
                onKeyPress={(event)=> event.key ==='Enter' ?sendMessage(event):null}
                /> */}
            </div>
        </div>
    )
}

export default Chat