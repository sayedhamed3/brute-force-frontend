const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;
import { useState, useEffect } from "react";
import axios from "axios";
const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(res)
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  export { 
    index,
  };