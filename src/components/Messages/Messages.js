import React, {useEffect, useState} from 'react'
import './Messages.css'
import Message from './Message/Message'
import {useAppSelector} from '../../hook.ts'
import {doc, onSnapshot} from 'firebase/firestore'
import {db} from '../../firebase'

const Messages = () => {

    const [messages, setMessages] = useState([])
    const data = useAppSelector(state => {return state.chat})

    useEffect(() => {
        if (data.chatId) {
            const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages)
            })

            return () => {
                unsub()
            }
        }
    }, [data.chatId])

    return (
        <div className={'messages'}>
            {messages ?
                messages.map((message, index) => (
                    <Message message={message} key={index}/>
                ))
                : null
            }
        </div>
    )
}

export default Messages