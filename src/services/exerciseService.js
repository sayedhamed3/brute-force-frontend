import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/exercise`;

const index = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}`, {headers:{Authorization: `Bearer ${token}`}});

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

const getExercise = async (exerciseId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/${exerciseId}`, {headers:{Authorization: `Bearer ${token}`}});

        return res.data
    } catch (error) {
        console.log(error);
    }
}

export {
    index,
    getExercise,
}