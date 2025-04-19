import React, { useState } from "react";
import "./ExerciseList.css";

const exercises = [
  { name: "Chest", img: "https://via.placeholder.com/150?text=Chest" },
  { name: "Shoulders", img: "https://via.placeholder.com/150?text=Shoulders" },
  { name: "Biceps", img: "https://via.placeholder.com/150?text=Biceps" },
  { name: "Triceps", img: "https://via.placeholder.com/150?text=Triceps" },
  { name: "Back", img: "https://via.placeholder.com/150?text=Back" },
  { name: "Neck", img: "https://via.placeholder.com/150?text=Neck" },
  { name: "Abs", img: "https://via.placeholder.com/150?text=Abs" },
  { name: "Legs", img: "https://via.placeholder.com/150?text=Legs" },
  { name: "Calves", img: "https://via.placeholder.com/150?text=Calves" },
  { name: "Forearm", img: "https://via.placeholder.com/150?text=Forearm" },
];

function ExerciseList() {
  const [search, setSearch] = useState("");

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="exercise-list">
      <h1>Exercise List</h1>
      <input
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="exercise-grid">
        {filteredExercises.map((exercise, index) => (
          <div key={index} className="exercise-card">
            <img src={exercise.img} alt={exercise.name} />
            <h2>{exercise.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseList;
