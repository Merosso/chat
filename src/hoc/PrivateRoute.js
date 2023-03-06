import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {useAppDispatch} from "../hook.ts";
import {auth} from "../firebase";
import {addCurrentUser} from "../redux/authSlice.ts";
import {useLocation, Navigate} from "react-router-dom";

export const PrivateRoute = ({children}) => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const currentUser = localStorage.getItem('token')

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                const displayName = user.displayName
                const email = user.email
                const photoURL = user.photoURL
                const uid = user.uid
                dispatch(addCurrentUser({displayName, email, photoURL, uid}))
                console.log(user)
            }
        })
        return () => {
            unsub()
        }
    }, [])

    if(!currentUser) {
        return <Navigate to={'/login'} state={{location}} />
    }

    return children
}

export const PrivateAuth = ({children}) => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const currentUser = localStorage.getItem('token')

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                const displayName = user.displayName
                const email = user.email
                const photoURL = user.photoURL
                const uid = user.uid
                dispatch(addCurrentUser({displayName, email, photoURL, uid}))
                console.log(user)
            }
        })
        return () => {
            unsub()
        }
    }, [])

    if(currentUser) {
        return <Navigate to={'/'} state={{location}} />
    }

    return children
}