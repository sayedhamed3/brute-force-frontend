import './App.css'
import {Routes ,Route} from 'react-router'
import LoginForm from './components/LoginForm/LoginForm.jsx'
import HomePageIndex from './components/HomePage/HomepageIndex.jsx'
import SignUpForm from './components/SignUpForm/SignUpForm'
import NavBar from './components/NavBar/NavBar.jsx'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'
import { useContext,useState , useEffect } from 'react';
import {authContext} from './context/AuthContext.jsx'
import ProfileDetails from './components/ProfileDetails/ProfileDetails.jsx'
import ProfileForm from './components/ProfileForm/ProfileForm.jsx'
import ExerciseList from './components/ExerciseList/ExerciseList.jsx'
import ExerciseDetails from './components/ExerciseDetails/ExerciseDetails.jsx'
import * as classService from './services/classService.js'
import PlanList from './components/PlanList/PlanList.jsx'
import PlanForm from './components/PlanForm/PlanForm.jsx'
import PlanDetails from './components/PlanDetails/PlanDetails.jsx'
import ClassesLIst from './components/ClassList/ClassList.jsx'
import ClasseDetails from './components/ClassDetails/ClassDetails.jsx'
import ClassForm from './components/ClassForm/ClassForm.jsx'


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
        <Route path="/home" element={<ValidateIsLoggedIn><HomePageIndex/></ValidateIsLoggedIn>}/>
        <Route path="/profile" element={<ValidateIsLoggedIn><ProfileDetails/></ValidateIsLoggedIn>}/>
        <Route path="/edit-user/:userId" element={<ValidateIsLoggedIn><ProfileForm /></ValidateIsLoggedIn>} />
        <Route path="/exercises" element={<ValidateIsLoggedIn><ExerciseList /></ValidateIsLoggedIn>} />
        <Route path="/exercises/:exerciseId" element={<ValidateIsLoggedIn><ExerciseDetails /></ValidateIsLoggedIn>} />
        <Route path="/plans" element={<ValidateIsLoggedIn><PlanList /></ValidateIsLoggedIn>} />
        <Route path="/plans/myPlans" element={<ValidateIsLoggedIn><PlanList myPlans={true} /></ValidateIsLoggedIn>} />
        <Route path="/plans/create" element={<ValidateIsLoggedIn><PlanForm /></ValidateIsLoggedIn>} />
        <Route path="/plans/:planId" element={<ValidateIsLoggedIn><PlanDetails /></ValidateIsLoggedIn>} />
        <Route path='/classes' element={<ValidateIsLoggedIn><ClassesLIst/></ValidateIsLoggedIn>}/>
        <Route path="/classes/:classId" element={<ValidateIsLoggedIn><ClasseDetails/></ValidateIsLoggedIn>}/>
        <Route path='/classes/create' element={<ValidateIsLoggedIn><ClassForm/></ValidateIsLoggedIn>}></Route>
      </Routes>
    </>
  )
}

export default App