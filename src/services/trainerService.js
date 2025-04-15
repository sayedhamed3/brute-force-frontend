import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/trainer`;

const createTrainer = async (formData) => {
    try {
        const res = await axios.post(`${BASE_URL}`, formData);
        
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}

const getTrainer = async (trainerId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/${trainerId}`, {headers:{Authorization: `Bearer ${token}`}});
        
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}

export {
    createTrainer,
    getTrainer,
}