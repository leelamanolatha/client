import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'

import './Messages.css'
// import closeIcon from '../../icons/closeIcon.png'
// import onlineIcon from '../../icons/onlineIcon.png'


const Messages = ({messages,name}) => (
    <ScrollToBottom className="messages">
        {messages.map((message,i)=><div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
)

export default Messages