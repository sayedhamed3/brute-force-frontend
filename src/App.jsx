import './App.css'
import {Routes ,Route} from 'react-router'
import LoginForm from './components/LogInForm/LoginForm'
import SignUpForm from './components/SignUpForm/SignupForm'
import HomePage from './components/HomePage/HomePage'
import Navbar from './components/NavBar/NavBar'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'

function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/home" element={<ValidateIsLoggedIn><HomePage/></ValidateIsLoggedIn>}/>
      </Routes>
    </>
  )
}

export default App
