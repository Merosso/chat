import React from 'react'
import './Sidebar.css'
import Search from '../Search/Search.tsx'
import SearchChats from '../SearchChats/SearchChats'
import {auth} from '../../firebase'
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {useAppSelector} from '../../hook.ts'

const Sidebar = () => {
    const user = useAppSelector(store => {return store.auth})
    const navigate = useNavigate()

    const userSignOut = async () => {
        await signOut(auth)
        localStorage.removeItem('token')
        navigate('/signup')
    }

    return (
        <div className={'sidebar'}>
            <div className={'sidebar__header'}>
                <span className={'sidebar__header_logo'}>Chat</span>
                <div className={'sidebar__header_user_data'}>
                    <img src={user.photoURL} alt={'user photo'}/>
                    <span>{user.displayName}</span>
                    <button className={'sidebar__header_logout'} onClick={userSignOut}>Logout</button>
                </div>
            </div>
            <Search/>
            <SearchChats/>
        </div>
    )
}

export default Sidebar