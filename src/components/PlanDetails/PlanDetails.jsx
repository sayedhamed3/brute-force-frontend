import { useState,useEffect } from "react";
import { useParams } from "react-router";
import { getPlan } from "../../services/planService";
import { Link } from "react-router";


function PlanDetails() {

    const { planId } = useParams()
    const [plan,setPlan] = useState(null)
    const [loading, setLoading] = useState(true);

    const loadPlan = async () => {
        try{
            const res = await getPlan(planId)
            setPlan(res)
        } catch(error)
        {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPlan();
    }, [planId])

    if (loading || !plan ) return <p>Loading...</p>

  return (
    <div className="plan-details">
        <h1>{plan.Name}</h1>
        <p>Created by: {plan.Maker.name}</p>
        <p>Description: {plan.Description}</p>
        <p>Visibility: {plan.visibility ? "Public" : "Private"}</p>

        <h2>Exercises</h2>
        <ul>
            {plan.exercises.map((ex, index) => (
                <li key={index}>
                    <h3>{ex.exercise?.name || "Unnamed Exercise"}</h3>
                    <img src={`../public/images/${ex.exercise.photo}`} alt={ex.exercise.name} style={{ width: '200px', height: 'auto' }} />
                    <ul>
                        {ex.sets.map((set, idx) => (
                            <li key={idx}>Set {idx + 1}: {set.reps} reps</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
        <Link to="/plans">All Plans</Link>
    </div>
  )
}

export default PlanDetails