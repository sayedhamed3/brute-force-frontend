import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useLocation, useParams } from "react-router"
import { createClass, updateClass, deleteClass } from "../../services/classService"
import { getMyPlans } from "../../services/planService"
import "./ClassForm.css"

function ClassForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const { classId } = useParams()
    const isEdit = location.state?.isEdit
    const [ClassData, setClassData] = useState({
        name: "",
        description: "",
        plan: "",
        trainer: "",
        daysOfWeek: [],
        startTime: "",
        endTime: "",
        capacity: 10 // Default capacity
    })
    const [error, setError] = useState(null)
    const [trainers, setTrainers] = useState([])
    const [plans, setPlans] = useState([])

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getMyPlans()
                console.log(response)
                setPlans(response)
            } catch (error) {
                console.error("Error fetching plans:", error)
            }
        }

        const fetchTrainers = async () => {
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

        const fetchClassData = async () => {
            if (isEdit) {
                try {
                    const token = localStorage.getItem("token")
                    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/classes/${classId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    const classData = response.data
                    setClassData({
                        ...classData,
                        plan: classData.plan?._id || "",
                        trainer: classData.trainer?._id || "",
                        daysOfWeek: classData.daysOfWeek?.map(day => typeof day === 'string' ? parseInt(day) : day) || [],
                        startTime: classData.startTime ? new Date(classData.startTime).toTimeString().substring(0, 5) : "",
                        endTime: classData.endTime ? new Date(classData.endTime).toTimeString().substring(0, 5) : "",
                        capacity: classData.capacity || 10
                    })
                } catch (error) {
                    console.error("Error fetching class data:", error)
                }
            }
        }

        fetchClassData()
        fetchPlans()
        fetchTrainers()
    }, [classId, isEdit])

    const handleChange = (e) => {
        const { name, value } = e.target
        setClassData(prevData => ({
            ...prevData,
            [name]: name === "capacity" ? parseInt(value) : value,
        }))
    }

    const handleDaysChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => parseInt(option.value))
        setClassData({ ...ClassData, daysOfWeek: options })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            
            const dataToSend = {
                ...ClassData,
                startTime: combineDateWithTime(new Date(), ClassData.startTime),
                endTime: combineDateWithTime(new Date(), ClassData.endTime)
            }

            if (isEdit) {
                const response = await updateClass(classId, dataToSend, token)
                console.log("Class updated successfully:", response.data)
            } else {
                const response = await createClass(dataToSend, token)
                console.log("Class created:", response.data)
            }
            navigate("/classes")
        } catch (error) {
            console.error("Error saving class:", error)
            setError(error.response?.data?.message || "Failed to save class. Please try again.")
        }
    }

    const combineDateWithTime = (date, timeString) => {
        if (!timeString) return null
        
        const [hours, minutes] = timeString.split(':').map(Number)
        const newDate = new Date(date)
        newDate.setHours(hours, minutes, 0, 0)
        return newDate
    }

    return (
        <div className="class-form-container">
            <h1>{isEdit ? "Edit Class" : "Create New Class"}</h1>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Class Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={ClassData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="plan">Plan:</label>
                    <select 
                        id="plan" 
                        name="plan" 
                        value={ClassData.plan} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select a plan</option>
                        {plans.map((plan) => (
                            <option key={plan._id} value={plan._id}>
                                {plan.Name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="trainer">Trainer:</label>
                    <select 
                        id="trainer" 
                        name="trainer" 
                        value={ClassData.trainer} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select a trainer</option>
                        {trainers.map((trainer) => (
                            <option key={trainer._id} value={trainer._id}>
                                {trainer.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="capacity">Capacity (max participants):</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        min="1"
                        max="100"
                        value={ClassData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="daysOfWeek">Days of the week (Hold Ctrl/Cmd to select multiple):</label>
                    <select 
                        id="daysOfWeek" 
                        name="daysOfWeek" 
                        multiple 
                        value={ClassData.daysOfWeek} 
                        onChange={handleDaysChange} 
                        required
                        size="7"
                    >
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="startTime">Start Time:</label>
                    <input 
                        type="time" 
                        id="startTime" 
                        name="startTime" 
                        value={ClassData.startTime} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endTime">End Time:</label>
                    <input 
                        type="time" 
                        id="endTime" 
                        name="endTime" 
                        value={ClassData.endTime} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        {isEdit ? "Update Class" : "Create Class"}
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn" 
                        onClick={() => navigate("/classes")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ClassForm