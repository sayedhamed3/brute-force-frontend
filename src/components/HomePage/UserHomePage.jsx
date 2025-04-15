import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../context/AuthContext'

function AdminHomepage() {

    const { user } = useContext(authContext);
    
  return (
    <div>
        <div>User Homepage </div>
        <div>Welcome {user.username}</div>
    </div>
  )
}

export default AdminHomepage