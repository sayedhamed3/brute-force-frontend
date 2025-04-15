import axios from "axios"
import { useContext, useEffect,useState } from "react"
import { useNavigate } from "react-router"
import { createClass,updateClass } from "../../services/classService"
function ClassForm(){
    const navigate = useNavigate()
    const [ClassData, setClassData] = useState({
        name:"",
        description:"",
        plan:"",
        trainer:"",
        daysOfWeek:[],
        startTime:"",
        endTime:""
    })
    const [error, setError] = useState(null)
    const [trainers, setTrainers] = useState([])
    const [plans, setPlans] = useState([])
    useEffect(() => {
        const fetchPlans= async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/plan`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setPlans(response.data)
            } catch (error) {
                console.error("Error fetching plans:", error)
            }
        }
        const fetchTrainers= async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/trainer`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setTrainers(response.data)
            } catch (error) {
                console.error("Error fetching trainers:", error)
            }
        }
        fetchPlans()
        fetchTrainers()
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target
        setClassData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleDaysChange = (e) => {
        const options=Array.from(e.target.selectedOptions,(option)=>parseInt(option.value))
        setClassData({...ClassData,daysOfWeek:options})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            const response = await createClass(ClassData,token)
            console.log("Class created:", response.data)
            navigate("/")
        } catch (error) {
            console.error("Error creating class:", error)
            setError("Failed to create class. Please try again.")
        }
    }
    return(
        <div>
            <h1>Class Form</h1>
            
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"value={ClassData.name} onChange={handleChange} required />

                <label htmlFor="plan">Plan:</label>
                <select id="plan" name="plan" value={ClassData.plan} onChange={handleChange} required>
                    <option value="">Select a plan</option>
                    {plans.map((plan) => (
                        <option key={plan._id} value={plan._id}>
                            {plan.Name}
                        </option>
                    ))}
                </select>

                <label htmlFor="trainer">Trainer:</label>
                <select id="trainer" name="trainer"value={ClassData.trainer} onChange={handleChange} required>
                    <option value="">Select a trainer</option>
                    {trainers.map((trainer) => (
                        <option key={trainer._id} value={trainer._id}>
                            {trainer.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="daysOfWeek">Days of the week:</label>
                <select id="daysOfWeek" name="daysOfWeek" multiple value={ClassData.daysOfWeek} onChange={handleChange} required>
                    <option value="0">Sunday</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                </select>

                <label htmlFor="startTime">Start Time:</label>
                <input type="time" id="startTime" name="startTime" value={ClassData.startTime} onChange={handleChange} required />

                <label htmlFor="endTime">End Time:</label>
                <input type="time" id="endTime" name="endTime" value={ClassData.endTime} onChange={handleChange} required />

                <button type="submit">Submit</button>
            </form>
            <button onClick={() => navigate(`/classes`)}>Cancel</button>
        </div>
    )

}

export default ClassForm