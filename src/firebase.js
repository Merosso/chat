import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebase = {
    apiKey: "AIzaSyAtttjwE1FcPZji9ZMdS4VBU3O6l1A6BHg",
    authDomain: "react-chat-65693.firebaseapp.com",
    projectId: "react-chat-65693",
    storageBucket: "react-chat-65693.appspot.com",
    messagingSenderId: "395033856354",
    appId: "1:395033856354:web:7fa37f3575cec8a140043b"
}

export const app = initializeApp(firebase)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()