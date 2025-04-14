import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../context/AuthContext'


function index() {
    const { user } = useContext(authContext); 
    console.log(user);
  return (
    <div>
        {/*{if user.role === 'admin'){
            <AdminHomepage />
        } else if user.role === 'user'){
            <UserHomepage />
        } else {
            <TrainerHomepage />
        }}*/}
    </div>
  )
}

export default index