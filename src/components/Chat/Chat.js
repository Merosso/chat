import React from 'react'
import './Chat.css'
import Messages from '../Messages/Messages'
import Input from '../Input/Input'
import {useAppSelector} from '../../hook.ts'

const Chat = () => {


    return(
        <div className={'chat'}>
            <div className={'chat__info'}>
                <span>{}</span>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat