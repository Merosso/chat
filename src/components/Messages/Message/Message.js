import React, {useEffect, useRef} from 'react'
import './Message.css'
import {useAppSelector} from '../../../hook.ts'

const Message = ({message}) => {

    const currentUser = useAppSelector(state => {return state.auth})
    const user = useAppSelector(state => {return state.chat.user})

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior:'smooth'})
    }, [message])

    return (
        <div
            ref={ref}
            className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className={'message__info'}>
                <img
                    src={message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : user.photoURL}
                    alt={''}/>
                <span>{message.senderId === currentUser.uid
                    ? currentUser.displayName
                    : user.displayName}</span>
            </div>
            <div className={'message__content'}>
                <p>{message.text}</p>
                <img src={message.photoURL}
                     alt={''}/>
            </div>
        </div>
    )
}

export default Message