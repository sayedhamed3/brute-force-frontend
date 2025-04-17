import axios from "axios";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/plan`;

const index = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}`, {headers:{Authorization: `Bearer ${token}`}});
    
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const getPlan = async (planId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/${planId}`, {headers:{Authorization: `Bearer ${token}`}});
    
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const getPrivatePlans = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/private`, {headers:{Authorization: `Bearer ${token}`}});
        
        console.log(res.data)
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const getMyPlans = async (userId) => {
    try {
        const publicPlans = await index()
        const privateplans = await getPrivatePlans()
        
        const userPublicPlans = publicPlans.filter(plan => plan.Maker?._id === userId)

        return [...userPublicPlans,...privateplans]
        
    } catch (error) {
        console.log(error)
    }
}

const createPlan = async (plan) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${BASE_URL}`, plan, {headers:{Authorization: `Bearer ${token}`}});

        return res.data;
    } catch (error) {
        console.log(error);
        
    }
}

const updatePlan = async (planId, plan) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${BASE_URL}/${planId}`, plan, {headers:{Authorization: `Bearer ${token}`}});

        return res.data;
    } catch (error) {
        console.log(error);
        
    }
}

const deletePlan = async (planId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${BASE_URL}/${planId}`, {headers:{Authorization: `Bearer ${token}`}});

        return res.data;
    } catch (error) {
        console.log(error);
        
    }
}

const addComment = async (planId, comment) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${BASE_URL}/${planId}/comment`, comment, {headers:{Authorization: `Bearer ${token}`}});

        return res.data;
    } catch (error) {
        console.log(error);
        
    }
}

const addExerciseToPlan = async (planId, exerciseId, sets) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${BASE_URL}/${planId}/exercise`, {exerciseId, sets}, {headers:{Authorization: `Bearer ${token}`}});

        return res.data;
    } catch (error) {
        console.log(error);
        
    }
}

const removeExerciseFromPlan = async (planId, exerciseId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${BASE_URL}/${planId}/exercise/${exerciseId}`, {headers:{Authorization: `Bearer ${token}`}});

        return res.data;
    } catch (error) {
        console.log(error);
        
    }
}

const updateExerciseInPlan = async (planId, exerciseId, sets) => { 
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${BASE_URL}/${planId}/exercise/${exerciseId}`, {sets}, {headers:{Authorization: `Bearer ${token}`}});

        return res.data;
    } catch (error) {
       console.log(error) 
    }
}

const getExercisesInPlan = async (planId, exerciseId) => { 
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/${planId}/exercise/${exerciseId}`, {headers:{Authorization: `Bearer ${token}`}});

        return res.data;
    } catch (error) {
       console.log(error) 
    }
}

export {
    index,
    getPlan,
    getPrivatePlans,
    getMyPlans,
    createPlan,
    updatePlan,
    deletePlan,
    addComment,
    addExerciseToPlan,
    removeExerciseFromPlan,
    updateExerciseInPlan,
    getExercisesInPlan,
}