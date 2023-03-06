import './App.css'
import Home from './containers/Home/Home'
import {Route, Routes} from 'react-router-dom'
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'
import {PrivateRoute} from './hoc/PrivateRoute'


function App() {

    return (
        <Routes>
            <Route path={'/'}>
                <PrivateRoute>
                    <Route index element={<Home/>}/>
                </PrivateRoute>
                <PrivateAuth>
                    <Route path={'/signup'} element={<Register/>}/>
                </PrivateAuth>
                <PrivateAuth>
                    <Route path={'/login'} element={<Login/>}/>
                </PrivateAuth>
            </Route>
        </Routes>
    )
}

export default App
