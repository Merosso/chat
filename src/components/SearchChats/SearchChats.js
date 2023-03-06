import React, {useState, useEffect} from 'react'
import './SearchChats.css'
import {doc, onSnapshot} from 'firebase/firestore'
import {auth, db} from '../../firebase'
import {sendUser} from '../../redux/chatSlice.ts'
import {useAppDispatch, useAppSelector} from '../../hook.ts'

const SearchChats = () => {
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => {return state.auth})
    const [chats, setChats] = useState('')

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data())
            })
            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid])

    const selectUser = () => {
        const uid = Object.entries(chats)[0][1].userInfo.uid
        const photoURL = Object.entries(chats)[0][1].userInfo.photoURL
        const displayName = Object.entries(chats)[0][1].userInfo.displayName
        const chatId = currentUser.uid > uid
            ? currentUser.uid + uid
            : uid + currentUser.uid
        dispatch(sendUser({chatId, displayName, photoURL, uid}))
    }

    return (
        <div>
            {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat, index) => (
            <div className={'search__chat'} key={index} onClick={selectUser}>
                <img src={chat[1].userInfo.photoURL}/>
                <div className={'search__chat_info'}>
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>
            ))}
        </div>
    )
}

export default SearchChats