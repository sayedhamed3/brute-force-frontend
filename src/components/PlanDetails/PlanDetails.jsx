import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPlan } from "../../services/planService";
import { Link } from "react-router";
import "./PlanDetails.css";

function PlanDetails() {
    const { planId } = useParams();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadPlan = async () => {
        try {
            const res = await getPlan(planId);
            setPlan(res);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlan();
    }, [planId]);

    if (loading || !plan) return <p className="loading-message">Loading...</p>;

    return (
        <div className="plan-details-background">
            <div className="plan-details-container">
                <h1>{plan.Name}</h1>
                
                <div className="plan-meta">
                    <p><strong>Created by:</strong> {plan.Maker.name}</p>
                    <p><strong>Description:</strong> {plan.Description}</p>
                    <p><strong>Visibility:</strong> {plan.visibility ? "Public" : "Private"}</p>
                </div>

                <div className="exercises-container">
                    <h2>Exercises</h2>
                    {plan.exercises.map((ex, index) => (
                        <div key={index} className="exercise-card">
                        <div className="exercise-image-container">
                            {ex.exercise?.photo && (
                            <img 
                                src={`/images/${ex.exercise.photo}`} 
                                alt={ex.exercise.name} 
                                className="exercise-image"
                            />
                            )}
                        </div>
                        
                        <div className="exercise-content">
                            <h3 className="exercise-title">{ex.exercise?.name || "Unnamed Exercise"}</h3>
                            {ex.exercise?.description && (
                            <p className="exercise-description">{ex.exercise.description}</p>
                            )}
                            
                            <div className="sets-container">
                            <h4>Sets</h4>
                            <ul className="sets-list">
                                {ex.sets.map((set, idx) => (
                                <li key={idx}>
                                    <span className="set-number">Set {idx + 1}</span>
                                    <span className="set-reps">{set.reps} reps</span>
                                </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                
                <Link to="/plans" className="back-link">
                    Back to All Plans
                </Link>
            </div>
        </div>
    );
}

export default PlanDetails;