import './App.css'
import Home from './containers/Home/Home'
import {Route, Routes} from 'react-router-dom'
import Register from './containers/Register/Register'
import Login from './containers/Login/Login'


function App() {

  return (
      <Routes>
        <Route path={'/'}>
          <Route index element={<Home/>}/>
          <Route path={'/signup'} element={<Register/>}/>
          <Route path={'/login'} element={<Login/>}/>
        </Route>
      </Routes>
  )
}

export default App
