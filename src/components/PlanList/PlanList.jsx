import { useState, useEffect } from "react"
import { index } from "../../services/planService"
import { Link } from "react-router"
import { getMyPlans, getPrivatePlans} from "../../services/planService"
import { authContext } from "../../context/AuthContext"
import { useContext } from "react"

function PlanList({ myPlans = false}) {

    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { user } = useContext(authContext)

    const getPlans = async () => {
        try {
            const res = await index()
            setPlans(res)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    const getPrivatePlans = async () => {
        try {
            console.log(user)
            const res = await getMyPlans(user._id)
            console.log(res)
            setPlans(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(myPlans)
        {
            getPrivatePlans()
        } else {
            getPlans()
        }
    }, [myPlans])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

  return (
    <>
    {myPlans ? (<Link to={"/plans"}>All Plans</Link>) : (<Link to={"/plans/myPlans"}>My Plans</Link>)}
        <div>Plan List</div>
        <table>
    <thead>
        <tr>
            <th>Name</th>
            {myPlans ? <th>Private/Public</th> : ''}
            <th>Maker</th>
            <th>Description</th>
            <th>Exercises</th>
            <th>Details</th>
    
        </tr>
    </thead>
    <tbody>
        {plans.map((plan) => (
            <tr key={plan._id}>
                <td>{plan.Name}</td>
                {myPlans ? <td>{plan.visibility ? "Public" : "Private" }</td> : ''}
                <td>{plan.Maker?.name || "Unknown"}</td>
                <td>{plan.Description}</td>
                <td>
                    <ul>
                        { plan.exercises.map((ex, idx) => (
                            <li key={idx}>
                                 {ex.exercise?.name || "Unknown Exercise"}
                                {" - "}
                                {ex.sets?.length || 0} sets
                            </li>
                        ))}
                    </ul>
                </td>
                <td>
                    <Link to={`/plans/${plan._id}`}>View Plan Details</Link>
                </td>
            </tr>
        ))}
    </tbody>
        </table>

        <div>
            <Link to="/plans/create">Create Plan</Link>
        </div>
    </>
  )
}

export default PlanList