import React from 'react'
import './SearchChats.css'
import {useAppDispatch, useAppSelector} from '../../hook.ts'

const SearchChats = () => {
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => {
        return state.auth
    })

    return (
        <div>
            <div className={'search__chat'} onClick={}>
                <img src={}/>
                <div className={'search__chat_info'}>
                    <span>{}</span>
                    <p>{}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchChats