import { getExercise } from "../../services/exerciseService";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

function ExerciseDetails() {

    const  { exerciseId } = useParams();

    const [exercise, setExercise] = useState(null);

    const getExerciseDetails = async () => {
        try {
            const exerciseDetails = await getExercise(exerciseId)
            setExercise(exerciseDetails)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getExerciseDetails()
    }, [])

  return (
    <div>
        {exercise ? (
            <div>
                <h1>{exercise.name}</h1>
                <img src={`../public/images/${exercise.photo}`} alt={exercise.name} style={{ width: '200px', height: 'auto' }} />
                <p><strong>Description:</strong> {exercise.description}</p>
                <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
                <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                <p><strong>Equipment:</strong> {exercise.equipment}</p>
                {exercise.img && <img src={exercise.photo} alt={exercise.name} style={{ width: '200px', height: 'auto' }} />}
                <Link to={"/exercises"}>Back to All Exercises</Link>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
  )
}

export default ExerciseDetails