import { useState, useEffect } from "react";
import { index } from "../../services/planService";
import { Link } from "react-router";
import { getMyPlans } from "../../services/planService";
import { authContext } from "../../context/AuthContext";
import { useContext } from "react";
import "./PlanList.css";

function PlanList({ myPlans = false }) {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(authContext);

    const getPlans = async () => {
        try {
            const res = await index();
            setPlans(res);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getPrivatePlans = async () => {
        try {
            const res = await getMyPlans(user._id);
            setPlans(res);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (myPlans) {
            getPrivatePlans();
        } else {
            getPlans();
        }
    }, [myPlans]);

    if (loading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">Error: {error.message}</p>;

    return (
        <div className="plan-list-container">
            <div className="plan-list-header">
                <h2 className="plan-list-title">
                    {myPlans ? "My Training Plans" : "All Training Plans"}
                </h2>
                <div className="plan-nav-links">
                    {myPlans ? (
                    <Link to="/plans" className="plan-nav-link">
                        View All Plans
                    </Link>
                    ) : (
                    <Link to="/plans/myPlans" className="plan-nav-link">
                        View My Plans
                    </Link>
                    )}
                    <Link to="/plans/create" className="create-plan-btn">
                    Create New Plan
                    </Link>
                </div>
            </div>

            <table className="plan-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        {myPlans && <th>Visibility</th>}
                        <th>Creator</th>
                        <th>Description</th>
                        <th>Exercises</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map((plan) => (
                        <tr key={plan._id}>
                            <td>{plan.Name}</td>
                            {myPlans && (
                                <td>
                                    <span className={`visibility-${plan.visibility ? "public" : "private"}`}>
                                        {plan.visibility ? "Public" : "Private"}
                                    </span>
                                </td>
                            )}
                            <td>{plan.Maker?.name || "Unknown"}</td>
                            <td>{plan.Description}</td>
                            <td>
                                <ul>
                                    {plan.exercises.map((ex, idx) => (
                                        <li key={idx}>
                                            {ex.exercise?.name || "Unknown Exercise"} - {ex.sets?.length || 0} sets
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <Link to={`/plans/${plan._id}`} className="view-plan-link">
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlanList;