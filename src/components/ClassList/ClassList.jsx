import { useState,useContext,useEffect} from "react";
import { authContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

function classList(){
    const { user } = useContext(authContext); // Consume the user from authContext
    const [classes, setClasses] = useState([])

    // async function callProtectedRoute() {
    //     const token = localStorage.getItem("token");
    //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     console.log(response.data);
    //   }
    //   useEffect(() => {
    //     callProtectedRoute();
    //   }, []);

      async function getClasses(){
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/classes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(response.data)
        console.log(response.data);
      }

      useEffect(() => {

        getClasses();
        }
        , []);
      return (
        <div>
    
           <h1>Upcoming classes</h1>
               
                {classes.map((classItem) => (
                    <div key={classItem._id} className="class-item">
                        <h2>{classItem.trainer}</h2>
                        <h2>{classItem.name}</h2>
                        <p>{classItem.description}</p>
                        <p>Start Time: {new Date(classItem.startTime).toLocaleDateString()}</p>
                        <p>End Time: {new Date(classItem.endTime).toLocaleTimeString()}</p>
                    </div>
                ))}
        </div>
       );
}

export default classList