import { useState, useEffect } from "react"
import { index } from "../../services/planService"

function PlanList() {

    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getPlans = async () => {
        try {
            const plans = await index()
            setPlans(plans)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPlans()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    if (!plans.length) return <p>No plans found</p>


  return (
    <>
        <div>Plan List</div>
        <table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Maker</th>
            <th>Description</th>
            <th>Exercises</th>
        </tr>
    </thead>
    <tbody>
        {plans.map((plan, index) => (
            <tr key={index}>
                <td>{plan.name}</td>
                <td>{plan.user?.name || "Unknown"}</td>
                <td>{plan.description}</td>
                <td>
                    <ul>
                        {plan.exercises.map((exercise, idx) => (
                            <li key={idx}>{exercise}</li>
                        ))}
                    </ul>
                </td>
            </tr>
        ))}
    </tbody>
        </table>
    </>
  )
}

export default PlanList