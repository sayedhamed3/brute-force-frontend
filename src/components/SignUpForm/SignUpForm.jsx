import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function SignUpForm() {

    const [formData, setFormData] = useState({
        username:"",
        password:"",
        name:"",
        avatar:"",
        membership:"",
        metrics:{
          height:"",
          weight:"",
        },
        role:""
    })

    const navigate = useNavigate()
    

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,formData)
            navigate("/login")
        }
        catch(err){
            console.log(err)
        }
    }

    async function handleMetrics(e){
        setFormData({...formData,metrics:{...formData.metrics,[e.target.name]:e.target.value}})
    }
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
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
        <label htmlFor='name'>Name:</label>
        <input type="text" 
        name='name'
        id='name' 
        value={formData.name} 
        onChange={handleChange} 
        />
        <label htmlFor='avatar'>Avatar:</label>
        <input type="text"
        name='avatar'
        id='avatar'
        value={formData.avatar}
        onChange={handleChange}
        />
        <label htmlFor='membership'>Membership:</label>
        <select
        name='membership'
        id='membership'
        value={formData.membership}
        onChange={handleChange}
        >
            <option value="trial">Trial</option>
            <option value="Monthly">Monthly</option>
            <option value="annual">Annual</option>
            <option value="trainer">Trainer</option>
        </select>
        <label htmlFor='height'>Height:</label>
        <input type="text"
        name='height'
        id='height'
        value={formData.metrics.height}
        onChange={handleMetrics}
        />
        <label htmlFor='weight'>Weight:</label>
        <input type="text"
        name='weight'
        id='weight'
        value={formData.metrics.weight}
        onChange={handleMetrics}
        />
        <label htmlFor='role'>Role:</label>
        <select
        name='role'
        id='role'
        value={formData.role}
        onChange={handleChange}
        >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="trainer">Trainer</option>
        </select>
          <button>Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm
