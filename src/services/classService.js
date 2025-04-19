import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/classes`;
const index = async () => {
    try {
      const token=localStorage.getItem("token")
      const res = await axios.get(`${BASE_URL}`, {authorization: `Bearer ${token}`});
      
      
      return res.data
    } catch (error) {
      console.log(error);
    }
  };

const getClass = async (classId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/${classId}`, {headers:{Authorization: `Bearer ${token}`}});
        
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}
const updateClass = async (classId, formData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${BASE_URL}/${classId}`, formData, {headers:{Authorization: `Bearer ${token}`}});
        
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}
const deleteClass = async (classId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${BASE_URL}/${classId}`, {headers:{Authorization: `Bearer ${token}`}});
        
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}
const createClass = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${BASE_URL}`, formData, {headers:{Authorization: `Bearer ${token}`}});
        
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}

export { 
    index,
    getClass,
    updateClass,
    deleteClass,
    createClass
};