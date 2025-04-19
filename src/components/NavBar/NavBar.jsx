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
        <Link to="/home">
          <li>Homepage</li>
        </Link>
        {user && (
          <>
            <li className="welcome-message">Welcome {user.username}</li>
            <Link to="/plan">
              <li>Exercise Plans</li>
            </Link>
            <Link to="/classes">
              <li>Classes this week</li>
            </Link>
            <Link to="/profile">
              <li>Profile details</li>
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/signup">
              <li>Signup</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
