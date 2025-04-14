import './App.css'
import {Routes ,Route} from 'react-router'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import HomePageIndex from './components/HomePage/HomepageIndex.jsx'
import SignUpForm from './components/SignUpForm/SignUpForm'
import NavBar from './components/NavBar/NavBar.jsx'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import { useContext, useEffect } from 'react';
import {authContext} from './context/AuthContext.jsx'
import ProfileDetails from './components/ProfileDetails/ProfileDetails.jsx'
import ProfileForm from './components/ProfileForm/ProfileForm.jsx'
import ExerciseList from './components/ExerciseList/ExerciseList.jsx'
import ExerciseDetails from './components/ExerciseDetails/ExerciseDetails.jsx'
function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/home" element={<ValidateIsLoggedIn><HomePageIndex/></ValidateIsLoggedIn>}/>
        <Route path="/profile" element={<ValidateIsLoggedIn><ProfileDetails/></ValidateIsLoggedIn>}/>
        <Route path="/edit-user/:userId" element={<ValidateIsLoggedIn><ProfileForm /></ValidateIsLoggedIn>} />
        <Route path="/exercises" element={<ValidateIsLoggedIn><ExerciseList /></ValidateIsLoggedIn>} />
        <Route path="/exercises/:exerciseId" element={<ValidateIsLoggedIn><ExerciseDetails /></ValidateIsLoggedIn>} />
      </Routes>
    </>
  )
}

export default App