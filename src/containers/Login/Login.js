import React from 'react'
import './Login.css'

const Login = () => {

    return (
        <div className={'login'}>
            <div className={'login__panel'}>
                <span className={'login__panel_logo'}>Chat</span>
                <span className={'login__panel_description'}>Login</span>
                <form className={'login__panel_form'}>
                    <input type={'email'} name={'email'} placeholder={'Email'}/>
                    <input type={'password'} name={'password'} placeholder={'Password'}/>
                    <button className={'login__panel_button'}>Login</button>
                </form>
                <span>You don't have an account? <p>Register</p></span>
            </div>
        </div>
    )
}

export default Login