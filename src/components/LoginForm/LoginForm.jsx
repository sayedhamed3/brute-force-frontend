import {useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { authContext } from '../..//context/AuthContext'
import { login } from '../../services/authService.js'


function LoginForm() {
      const [formData, setFormData] = useState({
          username:"",
          password:""
      })

      const {validateToken, setUser} = useContext(authContext)
      const navigate = useNavigate()

      function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
      e.preventDefault()
      try{
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,formData)
          console.log(response.data)
          localStorage.setItem("token",response.data.token)
          validateToken()
          // const signedInUser = await login(formData)
          // setUser(signedInUser)
          // after successful login, redirect to homepage
          navigate("/home")
          // navigate("/login")
      }
      catch(err){
        console.log("ERRR")
          console.log(err)
      }
  }


  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
         type="text"
         name='username'
         id='username'
         value={formData.username}
         onChange={handleChange}
          />

        <label htmlFor="password">Password:</label>
        <input
         type="password"
         name='password'
         id='password'
         value={formData.password}
         onChange={handleChange}
          />

          <button>Submit</button>
      </form>
    </div>
  )
}

export default LoginForm