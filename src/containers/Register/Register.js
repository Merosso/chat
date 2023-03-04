import React from 'react'
import './Register.css'

const Register = () => {

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
                <span>You do have not account? <p>Login</p></span>
            </div>
        </div>
    )
}

export default Register