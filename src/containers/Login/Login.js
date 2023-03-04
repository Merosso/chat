import React, {useState} from 'react'
import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../../firebase'
import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()

        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            onAuthStateChanged(auth, (user) => {
                localStorage.setItem('token', user.accessToken)
            })
            navigate('/')
        } catch (err) {
            setErr(true)
        }
    }

    return (
        <div className={'login'}>
            <div className={'login__panel'}>
                <span className={'login__panel_logo'}>Chat</span>
                <span className={'login__panel_description'} onSubmit={loginUser}>Login</span>
                <form className={'login__panel_form'}>
                    <input type={'email'} name={'email'} placeholder={'Email'}/>
                    <input type={'password'} name={'password'} placeholder={'Password'}/>
                    <button className={'login__panel_button'}>Login</button>
                </form>
                <span>You don't have an account? <Link to={'/signup'}>Register</Link></span>
            </div>
        </div>
    )
}

export default Login