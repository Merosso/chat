import React, {useState} from 'react'
import './Register.css'
import {Link, useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth, db, storage} from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState(false)

    const signUpUser = async (event) => {
        event.preventDefault()

        const displayName = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value
        const file = event.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res)

            const storageRef = ref(storage, displayName)

            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                (err) => {
                    setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        })
                        await setDoc(doc(db, 'userChats', res.user.uid), {})
                        localStorage.setItem('token', res.user.accessToken)
                        localStorage.setItem('expirationDate', res._TokenResponse.expiresIn)
                        localStorage.setItem('userId', res._TokenResponse.localId)
                        navigate('/')
                    })
                }
            )
        } catch (err) {
            setErr(true)
        }
    }

    return (
        <div className={'register'}>
            <div className={'register__panel'}>
                <span className={'register__panel_logo'}>Chat</span>
                <span className={'register__panel_description'}>Register</span>
                <form className={'register__panel_form'} onSubmit={signUpUser}>
                    <input type={'text'} placeholder={'Nickname'}/>
                    <input type={'email'} placeholder={'Email'} />
                    <input type={'password'} placeholder={'Password'}/>
                    <input type={'file'}/>
                    <label htmlFor='file'>
                        <span>Add an avatar</span>
                    </label>
                    <button className={'register__panel_signup'}>Sign up</button>
                </form>
                <span>You do have not account? <Link to={'/login'}>Login</Link></span>
            </div>
        </div>
    )
}

export default Register