import './App.css'
import {Routes ,Route} from 'react-router'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import HomePage from './components/HomePage/Homepage'
import SignUpForm from './components/SignUpForm/SignUpForm'
import NavBar from './components/NavBar/NavBar.jsx'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import { useContext,useState , useEffect } from 'react';
import {authContext} from './context/AuthContext.jsx'
import Classes from './components/ClassList/ClassList.jsx'
import * as classService from './services/classService.js'
function App() {
  const { user } = useContext(authContext); // Consume the user from authContext
  const [classes, setClasses] = useState([])
  // useEffect(() => {
  //   const fetchClasses = async () => {
  //     try {
  //       const res = await classService.index()
  //       console.log(res)
  //       setClasses(res)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   if (user) {
  //     fetchClasses()
  //   }
  // }, [user])
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/home" element={<ValidateIsLoggedIn><HomePage/></ValidateIsLoggedIn>}/>
        <Route path='/classes' element={<ValidateIsLoggedIn><Classes/></ValidateIsLoggedIn>}/>
      </Routes>
    </>
  )
}

export default App