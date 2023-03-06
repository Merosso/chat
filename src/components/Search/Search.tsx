import {useState} from 'react'
import './Search.css'
import {useAppSelector} from '../../hook.ts'
import {collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp} from 'firebase/firestore'
import {db} from '../../firebase'

const Search = () => {
    const [user, getUser] = useState('')
    const [username, getUsername] = useState('')
    const [err, setErr] = useState(false)
    const currentUser = useAppSelector(state => state.auth)

    const getUsers = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username))

        try{
            getUser('')
            setErr(false)
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                getUser(doc.data())
            })
            console.log(querySnapshot)

            if(!querySnapshot._snapshot.docChanges[0].doc) {
                setErr(true)
            }
        }catch(err){
            setErr(true)
        }
    }

    const searchHandler = (e) => {
        e.code === 'Enter' && getUsers()
    }

    const addUser = async () => {
        const combinedId: string = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid

        try{
            const res = await getDoc(doc(db, 'chats', combinedId))

            if(!res.exists()) {
                await setDoc(doc(db, 'chats', combinedId), {
                    messages: []
                })
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: {
                        displayName: user.displayName,
                        uid: user.uid,
                        photoURL: user.photoURL
                    },
                    [combinedId + '.date']: serverTimestamp()
                })
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: {
                        displayName: currentUser.displayName,
                        uid: currentUser.uid,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + '.date']: serverTimestamp()
                })
            }
        }catch(err){
            console.log(err)
        }
        getUsername('')
        getUser('')
    }

    return (
        <div className={'search'}>
            <div className={'search__form'}>
                <input
                    type={'text'}
                    placeholder={'Find a user'}
                    onChange={(e) => getUsername(e.target.value)}
                    value={username}
                    onKeyDown={searchHandler}
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