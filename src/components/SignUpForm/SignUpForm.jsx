import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { createTrainer } from '../../services/trainerService'

function SignUpForm() {

    const [formData, setFormData] = useState({
        username:"",
        password:"",
        name:"",
        avatar:"",
        membership: {
          type: "trial",
          isActive:true,
          startDate:"",
          endDate:"",
        },
        metrics:{
          height:0,
          weight:0,
        },
        role:"user"
    })

    const [trainerFormData, setTrainerFormData] = useState({  
      specialization:"",
      experience:0,
      certifications:[],
    })

    const navigate = useNavigate()
    

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
        try{
            const newUser = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,formData)


            console.log("newUser",newUser.data)
            
            if(formData.role === "trainer"){
                try {
                  await createTrainer({user: newUser.data._id,
                    ...trainerFormData})
                } catch (error) {
                  console.error("Error creating trainer:", error);
                  
                }
            }
            navigate("/login")
        }
        catch(err){
          console.error("Full error:", err);
          console.error("Error response:", err.response?.data);
        }
    }

async function handleMetrics(e){
  setFormData({
      ...formData,
      metrics: {
          ...formData.metrics,
          [e.target.name]: (e.target.value)
      }
  })
}

    async function handleMembership(e){
        setFormData({
          ...formData,
          membership:{
            ...formData.membership,
            [e.target.name]:e.target.value
          }
        })
    }

    async function handleTrainer(e){
        setTrainerFormData({...trainerFormData,[e.target.name]:e.target.value})
    }

    async function handleCertifications(e){
        setTrainerFormData({
            ...trainerFormData,
            certifications: e.target.value.split('\n'),
        })
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
        <label htmlFor='type'>Membership:</label>
        {formData.role === "trainer" ? (
                    <select
                        type="text"
                        name='type'
                        id='type'
                        value="trainer"
                        readOnly
                    >
                        <option value="trainer">Trainer</option>
                        </select>
                ) : (
                    <select
                        name='type'
                        id='type'
                        value={formData.membership.type}
                        onChange={handleMembership}
                    >
                        <option value="trial">Trial</option>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                    </select>
                )}
        <label htmlFor='height'>Height:</label>
        <input type="number"
        name='height'
        id='height'
        value={formData.metrics.height}
        onChange={handleMetrics}
        />
        <label htmlFor='weight'>Weight:</label>
        <input type="number"
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
            <option value="trainer">Trainer</option>
        </select>
        {formData.role === "trainer" && (
          <div>
            <label htmlFor='specialization'>Specialization:</label>
            <input type="text"
            name='specialization'
            id='specialization'
            value={trainerFormData.specialization}
            onChange={handleTrainer}
            />
            <label htmlFor='experience'>Experience:</label>
            <input type="number"
            name='experience'
            id='experience'
            value={trainerFormData.experience}
            onChange={handleTrainer}
            />
            <label htmlFor='certifications'>Certifications:</label>
            <textarea
              name='certifications'
              id='certifications'
              value={trainerFormData.certifications.join('\n')}
              onChange={handleCertifications}
              placeholder="Enter certifications, one per line"
            />
          </div>
        )}

          <button>Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm
