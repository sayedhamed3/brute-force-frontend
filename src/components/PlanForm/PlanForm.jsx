import { useState, useContext, useEffect } from "react";
import { authContext } from "../../context/AuthContext";
import { createPlan } from "../../services/planService";
import { useNavigate } from "react-router";
import { index } from "../../services/exerciseService";
import "./PlanForm.css"

function PlanForm() {
    const { user } = useContext(authContext);
    const [plan, setPlan] = useState({
        Name: "",
        Maker: user.id,
        Description: "",
        exercises: [],
        visibility: true
    });

    const [availableExercises, setAvailableExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState("");
    const [sets, setSets] = useState([{ reps: 10 }]);
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const exercisesData = await index();
            
            const sortedExercises = [...exercisesData].sort((a, b) => 
                a.name.localeCompare(b.name)
            );
            setAvailableExercises(sortedExercises);
        } catch (error) {
            console.error("Failed to load exercises:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setPlan({
            ...plan,
            [name]: name === "visibility" ? value === "true" : value
        });
    };

    const handleCancel = () => {
        navigate('/plans');
    }

    const handleExerciseSelect = (e) => {
        setSelectedExercise(e.target.value);
    };

    const handleSetChange = (index, e) => {
        const newSets = [...sets];
        newSets[index].reps = parseInt(e.target.value) || 0;
        setSets(newSets);
    };

    const addSet = () => {
        setSets([...sets, { reps: 10 }]);
    };

    const removeSet = (index) => {
        const newSets = [...sets];
        newSets.splice(index, 1);
        setSets(newSets);
    };

    const addExerciseToPlan = () => {
        if (!selectedExercise) return;

        const exerciseToAdd = availableExercises.find(ex => ex._id === selectedExercise);
        if (!exerciseToAdd) return;

        setPlan({
            ...plan,
            exercises: [
                ...plan.exercises,
                {
                    exercise: selectedExercise,
                    exerciseName: exerciseToAdd.name,
                    sets: [...sets]
                }
            ]
        });

        setSelectedExercise("");
        setSets([{ reps: 10 }]);
    };

    const removeExerciseFromPlan = (index) => {
        const newExercises = [...plan.exercises];
        newExercises.splice(index, 1);
        setPlan({
            ...plan,
            exercises: newExercises
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(plan)
        try {

            const createdPlan = await createPlan(plan);
            navigate(`/plans/${createdPlan._id}`);
        } catch (error) {
            console.error("Failed to create plan:", error);
        }
    };

    return (
    <div className="plan-form-background">
        <div className="plan-form-container">
            <h1>Create New Plan</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Plan Name:</label>
                    <input
                        type="text"
                        name="Name"
                        value={plan.name}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Description">Description:</label>
                    <textarea
                        name="Description"
                        value={plan.description}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="visibility">Visibility:</label>
                    <select
                        name="visibility"
                        value={plan.visibility.toString()}
                        onChange={onChange}
                        required
                    >
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                    </select>
                </div>

                <div className="exercise-section">
                    <h2>Add Exercises</h2>
                    <div className="form-group">
                        <label>Select Exercise:</label>
                        <select
                            value={selectedExercise}
                            onChange={handleExerciseSelect}
                        >
                            <option value="">Select an exercise</option>
                            {availableExercises.map(exercise => (
                                <option key={exercise._id} value={exercise._id}>
                                    {exercise.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedExercise && (
                        <div className="sets-section">
                            <h3>Sets Configuration</h3>
                            {sets.map((set, index) => (
                                <div key={index} className="set-item">
                                    <label>Set {index + 1}:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={set.reps}
                                        onChange={(e) => handleSetChange(index, e)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSet(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addSet}>
                                Add Set
                            </button>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={addExerciseToPlan}
                        disabled={!selectedExercise}
                    >
                        Add Exercise to Plan
                    </button>
                </div>

                {/* Display added exercises */}
                {plan.exercises.length > 0 && (
                    <div className="added-exercises">
                        <h2>Exercises in Plan</h2>
                        <ul>
                            {plan.exercises.map((exercise, index) => (
                                <li key={index}>
                                    <div>
                                        <strong>{exercise.exerciseName}</strong>
                                        <ul>
                                            {exercise.sets.map((set, setIndex) => (
                                                <li key={setIndex}>
                                                    Set {setIndex + 1}: {set.reps} reps
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeExerciseFromPlan(index)}
                                    >
                                        Remove Exercise
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="form-actions">
                    <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="submit-button">
                        Create Plan
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default PlanForm;