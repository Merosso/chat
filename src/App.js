import './App.css'
import Home from './containers/Home/Home'
import {Route, Routes} from 'react-router-dom'
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'
import {PrivateRoute, PrivateAuth} from './hoc/PrivateRoute'


function App() {

    return (
        <Routes>
            <Route path={'/'}>
                <Route index element={
                    <PrivateRoute>
                        <Home/>
                    </PrivateRoute>
                }/>
                <Route path={'/signup'} element={
                    <PrivateAuth>
                        <Register/>
                    </PrivateAuth>
                }/>
                <Route path={'/login'} element={
                    <PrivateAuth>
                        <Login/>
                    </PrivateAuth>
                }/>
            </Route>

        </Routes>
    )
}

export default App
