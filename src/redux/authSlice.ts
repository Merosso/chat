import {createSlice} from '@reduxjs/toolkit'

type User = {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string | null;
}

const initialState: User = {
    displayName: null,
    email: null,
    photoURL: null,
    uid: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addCurrentUser(state, action) {
            console.log(action.payload)
            state.displayName = action.payload.displayName
            state.email = action.payload.email
            state.photoURL = action.payload.photoURL
            state.uid = action.payload.uid
        }
    },
    extraReducers: {}
})

export const {addCurrentUser} = authSlice.actions

export default authSlice.reducer