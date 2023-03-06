import React, {useState} from 'react'
import './Input.css'
import {useAppSelector} from '../../hook.ts'
import {
    arrayUnion,
    doc,
    updateDoc,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore'
import {db, storage} from '../../firebase'
import {v4 as uuid} from 'uuid'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'

const Input = () => {

    const [message, setMessage] = useState('')
    const [img, setImg] = useState(null)
    const [err, setErr] = useState(false)

    const currentUser = useAppSelector(state => {return state.auth})
    const data = useAppSelector(state => {return state.chat})

    const sendMessage = async () => {

        if (img) {
            const storageRef = ref(storage, uuid())
            const uploadTask = uploadBytesResumable(storageRef, img)

            uploadTask.on(
                (err) => {
                    setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text: message,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        })
                    })
                }
            )
        } else {
            console.log(data.chatId)
            await updateDoc(doc(db, "chats",  data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: message,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text: message
            },
            [data.chatId + '.date']: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text: message
            },
            [data.chatId + '.date']: serverTimestamp()
        })

        setMessage('')
        setImg(null)
    }

    return (
        <div className={'input'}>
            <input
                type={'text'}
                placeholder={'Type something'}
                onChange={e => setMessage(e.target.value)}
                value={message}
            />
            <div className={'input__send'}>
                <input type={'file'} style={{display: 'none'}} onChange={e => setImg(e.target.files[0])}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Input