import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../../context/AuthContext"


function NavBar() {
  const {user, logout} = useContext(authContext)


  return (
    <div>
      <ul>
        <Link to="/home"><li>Homepage</li></Link>
        {user && (

          <>
          <Link to="/plan"><li>Exercise Plans</li></Link>
          <Link to="/classes"><li>Classes this week</li></Link>
          <Link to="/user"><li>Personal details</li></Link>
          

          <li>Welcome {user.username}</li>
          <button onClick={logout}>Logout</button>
          </>
        )}
        {!user && (
          <>
          <Link to='/login'><li>Login</li></Link>
          <Link to='/signup'><li>Signup</li></Link>
          </>
        )}
        

      </ul>
    </div>
  )
}

export default NavBar