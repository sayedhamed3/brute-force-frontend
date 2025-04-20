import { Link } from "react-router";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import "./NavBar.css";
import logo from "../../../public/gym logos/gym_logo_-_red___black-removebg-preview.png";

function NavBar() {
  const { user, logout } = useContext(authContext);

  return (
    <div className="navbar">
      <img src={logo} className="logo" />
      <ul>

        {user && (
          <>
         <li>
              <Link to="/home">Homepage</Link>
            </li>
            <li>
              <Link to="/plans">Exercise Plans</Link>
            </li>
            <li>
              <Link to="/exercises">Exercises</Link>
            </li>
            <li>
              <Link to="/classes">Classes</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
        {!user && (
          <>
             <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
