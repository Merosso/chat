import {createSlice} from '@reduxjs/toolkit'

type Chat = {
    displayName: string;
    photoURL: string;
    uid: string;
}

type RootChat = {
    user: Chat;
    chatId: string;
}

const initialState: RootChat = {
    chatId: '',
    user: {
        displayName: '',
        photoURL: '',
        uid: null
    }
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendUser(state, action) {
            state.chatId = action.payload.chatId
            state.user.displayName = action.payload.displayName
            state.user.photoURL = action.payload.photoURL
            state.user.uid = action.payload.uid
        }
    }
})

export const {sendUser} = chatSlice.actions

export default chatSlice.reducer