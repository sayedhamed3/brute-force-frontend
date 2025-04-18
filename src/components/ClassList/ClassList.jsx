import { useState,useContext,useEffect} from "react";
import { authContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { deleteClass } from "../../services/classService";
function classList(){
    const { user } = useContext(authContext); // Consume the user from authContext
    const [classes, setClasses] = useState([])
    const navigate=useNavigate()
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
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/classes`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setClasses(response.data)
          console.log(response.data);
        } catch (error) {
          console.log("error fetching classes:",error)
        }
      }
      const handleDelete = async (classId) => {
        try {
            await deleteClass(classId);
            getClasses(); // Refresh the user list after deletion
            console.log("Class deleted successfully");
        } catch (error) {
            console.log("Error deleting user:", error);
        }
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
                        <h2>{classItem.name}</h2>
                        <h4>{classItem.plan.Name} plan, Description:{classItem.plan.Description}</h4>
                        <h2>trainer:{classItem.trainer.name}</h2>
                        <p>{classItem.description}</p>
                        <p>Day of the week:
                          {classItem.daysOfWeek.map((day)=>{
                            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                            return <span key={day}>{days[day]} </span>
                          })}
                        </p>
                        <p>Start Time: {new Date(classItem.startTime).toLocaleTimeString()}</p>
                        <p>End Time: {new Date(classItem.endTime).toLocaleTimeString()}</p>
                        {(user.role === "admin" || user.role === "trainer")&& (
                          <div>
                            <button onClick={() => navigate(`/classes/${classItem._id}`)}>View class details</button>
                            <button onClick={() => handleDelete(classItem._id)}>Delete</button>
                          </div>
                        )}
                    </div>
                ))}
                {(user.role === "admin" || user.role === "trainer")&& (
                  <div>
                    <button onClick={() => navigate(`/classes/create`,{state:{isEdit:false}})}>Add a new Class</button>
                  </div>
                )}
        </div>
       );
}

export default classList