import { useContext,useEffect} from "react";
import { authContext } from "../../context/AuthContext";
import axios from "axios";

function classDetails(){
    const { user } = useContext(authContext); // Consume the user from authContext
    async function callProtectedRoute() {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
      }
      useEffect(() => {
        callProtectedRoute();
      }, []);
      return (
        <div>
         <div>
           <h1>Upcoming classes</h1>

         </div>
         
        </div>
       );
}

export default classDetails