import {useState} from 'react'
import './Search.css'
import {useAppSelector} from '../../hook.ts'

const Search = () => {
    const [user, getUser] = useState('')
    const [username, getUsername] = useState('')
    const [err, setErr] = useState(false)
    const currentUser = useAppSelector(state => state.auth)


    return (
        <div className={'search'}>
            <div className={'search__form'}>
                <input
                    type={'text'}
                    placeholder={'Find a user'}
                    onChange={(e) => getUsername(e.target.value)}
                    value={username}
                    onKeyDown={}
                />
            </div>
            {err && <span>User not a found</span>}
            {user &&
                <div className={'search__chat'} onClick={addUser}>
                    <img src={user.photoURL} alt={''}/>
                    <div className={'search__chat_info'}>
                        <span>{user.displayName}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Search