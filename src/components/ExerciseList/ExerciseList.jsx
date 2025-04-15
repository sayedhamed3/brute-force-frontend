import React from 'react'
import { index } from '../../services/exerciseService'
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

function ExerciseList() {

    const [exercises, setExercises] = useState([]);

    const getAllExercises = async() => {
        try {
            const allExercises = await index();
            console.log("ALL EXERCISES:" ,allExercises);
            setExercises(allExercises);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllExercises();
    }, []);

return (
    <>
            <div>Exercise List</div>
            <div>
                    <ul>
                            {exercises.map((exercise) => (
                                    <li key={exercise._id}>
                                            <h3>{exercise.name}</h3>
                                            <p><strong>Description:</strong> {exercise.description}</p>
                                            <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
                                            <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                                            <p><strong>Equipment:</strong> {exercise.equipment}</p>
                                            {exercise.img && <img src={exercise.photo} alt={exercise.name} style={{ width: '200px', height: 'auto' }} />}
                                            <Link to={`/exercises/${exercise._id}`}><button>View Details</button></Link>
                                    </li>
                            ))}
                    </ul>
            </div>
    </>
)
}

export default ExerciseList