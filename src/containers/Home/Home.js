import React from 'react'
import './Home.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Chat from '../../components/Chat/Chat'

const Home = () => {
    return(
        <div className={'home__container'}>
            <Sidebar/>
            <Chat/>
        </div>
    )
}

export default Home