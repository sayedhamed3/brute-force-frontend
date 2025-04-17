import React from 'react'
import { index } from '../../services/exerciseService'
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

function ExerciseList() {

    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [search, setSearch] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [bodyPart, setBodyPart] = useState('');
    const [page, setPage] = useState(1);
    const exercisesPerPage = 10;
 

    const getAllExercises = async() => {
        try {
            const allExercises = await index({});
            console.log("ALL EXERCISES:" ,allExercises);
            setExercises(allExercises);
        } catch (error) {
            console.log(error);
        }
    }

    const filterExercises = () => {
        let filtered = [...exercises];
        if (search) {
            filtered = filtered.filter(exercise => exercise.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (muscleGroup) {
            filtered = filtered.filter(exercise => exercise.muscleGroup === muscleGroup);
        }
        if (bodyPart) {
            filtered = filtered.filter(exercise => exercise.bodyPart === bodyPart);
        }
        setFilteredExercises(filtered);

        const startIndex = (page - 1) * exercisesPerPage;
        const endIndex = startIndex + exercisesPerPage;
        setFilteredExercises(filtered.slice(startIndex, endIndex));

    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    useEffect(() => {
        getAllExercises();
    }, []);

    useEffect(() => {
        filterExercises();
    }, [search, muscleGroup, bodyPart, page, exercises]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }
    
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'muscleGroup') {
            setMuscleGroup(value);
        } else if (name === 'bodyPart') {
            setBodyPart(value);
        }
        setPage(1);
    }

return (
    <>
    
    <div>Exercise List</div>
        <div>
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by exercise name"
            />
                
            <select name="muscleGroup" value={muscleGroup} onChange={handleFilterChange}>
                <option value="">All Muscle Groups</option>
                <option value="Biceps">Biceps</option>
                <option value="Triceps">Triceps</option>
                <option value="Chest">Chest</option>
                <option value="Abs">Abs</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Back">Back</option>
                <option value="Neck">Neck</option>
                <option value="Calves">Calves</option>
                <option value="Legs">Legs</option>
                <option value="Forearms">Forearms</option>
            </select>

            <select name="bodyPart" value={bodyPart} onChange={handleFilterChange}>
                <option value="">All Body Parts</option>
                <option value="upper_body">Upper Body</option>
                <option value="lower_body">Lower Body</option>
                <option value="core">Core</option>
                {/* <option value="full_body">Full Body</option> */}
            </select>
        </div>
        
        <div>
            <ul>
                {filteredExercises.map((exercise) => (
                    <li key={exercise._id}>
                        <h3>{exercise.name}</h3>
                        <p><strong>Description:</strong> {exercise.description}</p>
                        <p><strong>Muscle Group:</strong> {exercise.muscleGroup}</p>
                        <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                        <p><strong>Equipment:</strong> {exercise.equipment}</p>
                        {exercise.photo && <img src={`public/images/${exercise.photo}`} alt={exercise.name} style={{ width: '200px', height: 'auto' }} />}
                        <Link to={`/exercises/${exercise._id}`}><button>View Details</button></Link>
                    </li>
                ))}
            </ul>
        </div>
            <div>
                <button 
                    disabled={page === 1} 
                    onClick={() => handlePageChange(page - 1)}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button 
                    disabled={filteredExercises.length < exercisesPerPage} 
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </button>
            </div>
    </>
)
}

export default ExerciseList