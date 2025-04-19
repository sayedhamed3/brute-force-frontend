import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { authContext } from "../..//context/AuthContext";
import "./LoginForm.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { validateToken } = useContext(authContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e){
    e.preventDefault()
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,formData)
        console.log(response)
        
        localStorage.setItem("token",response.data.token)

        await validateToken()
        navigate("/home")
    }
    catch(err){
        console.log(err)
    }
  }

  return (
    <div className="login-in">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;
