import './App.css'
import {Routes ,Route} from 'react-router'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import HomePage from './components/HomePage/Homepage'
import SignUpForm from './components/SignUpForm/SignUpForm'
import NavBar from './components/NavBar/NavBar.jsx'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import { useContext, useEffect } from 'react';
import {authContext} from './context/AuthContext.jsx'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/home" element={<ValidateIsLoggedIn><HomePage/></ValidateIsLoggedIn>}/>
      </Routes>
    </>
  )
}

export default App