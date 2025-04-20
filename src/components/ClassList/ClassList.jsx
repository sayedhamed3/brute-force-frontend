import { useState,useContext,useEffect} from "react";
import { authContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import "./ClassList.css"


function ClassList(){
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
          console.log("classes:",classes)
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
        <div className="class-list-container">
            <h1>Upcoming classes</h1>
            
            {classes?.length === 0 ? (
                <p>No classes scheduled</p>
            ) : (
                classes?.map((classItem) => (
                    <div key={classItem?._id} className="class-item">
                        <h2>{classItem?.name || "Unnamed Class"}</h2>
                        <h4>
                            {classItem?.plan?.name || "No plan"} plan, 
                            Description: {classItem?.plan?.Description || "No description"}
                        </h4>
                        <h2>Trainer: {classItem?.trainer?.name || "No trainer assigned"}</h2>
                        <p>{classItem?.description || "No description available"}</p>
                        <p>
                            Day of the week:
                            {classItem?.daysOfWeek?.length > 0 ? (
                                classItem.daysOfWeek.map((day) => {
                                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                    return <span key={day}>{days[day]} </span>;
                                })
                            ) : (
                                <span>No days scheduled</span>
                            )}
                        </p>
                        <p>
                          Capacity: {classItem?.capacity ? classItem.capacity : "Undefined"}
                        </p>
                        <p>Start Time: {classItem?.startTime ? new Date(classItem.startTime).toLocaleTimeString() : "Not specified"}</p>
                        <p>End Time: {classItem?.endTime ? new Date(classItem.endTime).toLocaleTimeString() : "Not specified"}</p>
                        
                        {(user?.role === "admin" || user?.role === "trainer") && (
                            <div>
                                <button onClick={() => navigate(`/classes/${classItem?._id}`)}>
                                    View class details
                                </button>
                            </div>
                        )}
                        {(user?.role === "user" && (
                          <>
                          <div>
                            <button onClick={handleRegister}>{isRegistered ? "Unregister" : "Register"}</button>
                          </div>
                          </>
                        ))}
                    </div>
                ))
            )}
            
            {(user?.role === "admin" || user?.role === "trainer") && (
                <div>
                    <button onClick={() => navigate(`/classes/create`, { state: { isEdit: false } })}>
                        Add a new Class
                    </button>
                </div>
            )}
        </div>
       );
}

export default ClassList