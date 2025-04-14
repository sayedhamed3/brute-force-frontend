import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

const index = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}`, {headers:{Authorization: `Bearer ${token}`}});

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

const getUser = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/${userId}`, {headers:{Authorization: `Bearer ${token}`}});

        return res.data
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (userId, formData) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${BASE_URL}/${userId}`, formData, {headers:{Authorization: `Bearer ${token}`}});
        
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}

const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${BASE_URL}/${userId}`, {headers:{Authorization: `Bearer ${token}`}});
        
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}
export {
    index,
    getUser,
    updateUser,
    deleteUser
};