import { useState,useContext,useEffect} from "react";
import { authContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate,useParams } from "react-router";
import { deleteClass } from "../../services/classService";
import { getClass } from "../../services/classService";
function classDetails(){
  const { user } = useContext(authContext); // Consume the user from authContext
  const [classData, setClasses] = useState(null)
  const { classId } = useParams()
  /*console.log(classId)*/
  const navigate=useNavigate()
  {/*async function callProtectedRoute() {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
      }*/}
      const Base_URL = `${import.meta.env.VITE_BACKEND_URL}/classes`;
      async function getClassData() {
        try {
            // const data = await getClass(classId); // Fetch class by ID
            const token = localStorage.getItem("token");
            const response = await axios.get(`${Base_URL}/${classId}`, 
                { headers: { Authorization: `Bearer ${token}` } });
            console.log("Class data:", response.data);
            setClasses(response.data); // Update state with class details
        } catch (error) {
            console.error("Error fetching class:", error);
        }
    }
      useEffect(() => {
        getClassData();
      }, []);
      // console.log(classData)
      const handleEdit = (classId) => {
        navigate(`/classes/edit/${classId}`,{state:{isEdit:true}});
    }
    const handleDelete = async (classId) => {
      try {
          await deleteClass(classId);
          navigate("/classes"); // Redirect to classes list after deletion
          console.log("User deleted successfully");
      } catch (error) {
          console.log("Error deleting user:", error);
      }
  }
      return (
        <div>
            <h1>Class Details</h1>
            {classData && (
              <div>
            <h2>Name: {classData.name}</h2>
            <p>Plan: {classData.plan?.Name}</p>
            <p>Trainer: {classData.trainer?.name}</p>
            <p>
                Days of the Week:{" "}
                {classData.daysOfWeek.map((day) => {
                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    return <span key={day}>{days[day]} </span>;
                })}
            </p>
            <p>Start Time: {new Date(classData.startTime).toLocaleTimeString()}</p>
            <p>End Time: {new Date(classData.endTime).toLocaleTimeString()}</p>
            <p>Registered users: {classData.registeredUsers.map((User)=>{
                return <span key={User._id}>{User.Name} </span>;
            })}</p>
            <button onClick={() => navigate("/classes")}>Back to Classes</button> 
            {(user.role === "admin" || user.role === "trainer")&& (
                  <div>
                    <button onClick={() => handleEdit(classData._id)}>Edit Class</button>
                    <button onClick={()=>handleDelete(classData._id)}>Delete Class</button>
                  </div>
                )}
              </div>
            )}
        </div>
       );
}

export default classDetails