import React from 'react'
import './Chat.css'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'
import {useAppSelector} from '../../hook.ts'

const Chat = () => {

    const user = useAppSelector(state => {return state.chat.user})

    return(
        <div className={'chat'}>
            <div className={'chat__info'}>
                <span>{user.displayName}</span>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat