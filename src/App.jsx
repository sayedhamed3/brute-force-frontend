import './App.css'
import {Routes ,Route} from 'react-router'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import HomePage from './components/HomePage/Homepage'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Navbar from './components/Navbar'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import Detailspage from './pages/Detailspage'
import * as detailServices from './Services/detailservices.js'
import { useContext, useState, useEffect } from 'react';
import {authContext} from './context/AuthContext.jsx'
function App() {
  const { user } = useContext(authContext);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const userData = await detailServices.index();
  
      // console log to verify
      console.log('userData:', userData);
    };
    if (user) fetchAllUsers();
  }, [user]);
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/home" element={<ValidateIsLoggedIn><HomePage/></ValidateIsLoggedIn>}/>
        <Route path="/user" element={<ValidateIsLoggedIn><Detailspage/></ValidateIsLoggedIn>}/>
      </Routes>
    </>
  )
}

export default App