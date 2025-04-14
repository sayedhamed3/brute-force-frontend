import {useContext,useEffect} from 'react'
import { authContext } from '../../context/AuthContext'
import axios from 'axios'

function HomePage() {
  const { user } = useContext(authContext); // Consume the user from authContext

  // sending request to protected route that needs a token
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
      <h1>Welcome, {user?.name || "Guest"}!</h1>
      <p>Were glad to have you here.</p>
    </div>
  );
}

export default HomePage
