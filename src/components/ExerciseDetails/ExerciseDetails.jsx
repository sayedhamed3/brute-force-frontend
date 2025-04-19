import { getExercise } from "../../services/exerciseService";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import "./ExerciseDetails.css";

function ExerciseDetails() {
    const { exerciseId } = useParams();
    const [exercise, setExercise] = useState(null);

    const getExerciseDetails = async () => {
        try {
            const exerciseDetails = await getExercise(exerciseId);
            setExercise(exerciseDetails);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getExerciseDetails();
    }, []);

    const formatBodyPart = (bodyPart) => {
        switch(bodyPart) {
            case 'upper_body': return 'Upper Body';
            case 'lower_body': return 'Lower Body';
            case 'core': return 'Core';
            default: return bodyPart;
        }
    };

    return (
        <div className="exercise-details-container">
            {exercise ? (
                <div className="exercise-details-content">
                    <h1>{exercise.name}</h1>
                    {exercise.photo && (
                        <img 
                            src={`/images/${exercise.photo}`} 
                            alt={exercise.name} 
                            className="exercise-image"
                        />
                    )}
                    <p><strong>Description:</strong> {exercise.description}</p>
                    <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
                    <p><strong>Body Part:</strong> {formatBodyPart(exercise.bodyPart)}</p>
                    <p><strong>Equipment:</strong> {exercise.equipment}</p>
                    <Link to="/exercises" className="back-button">
                        Back to All Exercises
                    </Link>
                </div>
            ) : (
                <p>Loading exercise details...</p>
            )}
        </div>
    );
}

export default ExerciseDetails;