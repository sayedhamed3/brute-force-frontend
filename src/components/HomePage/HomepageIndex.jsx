import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import AdminHomepage from './AdminHomepage'
import UserHomepage from './UserHomePage'


function HomepageIndex() {
    const { user } = useContext(authContext); 
    console.log(user);
  return (
    <div>

        {/*{if user.role === 'admin'){

        <div>Homepage </div>
        {user.role === 'admin' ? (
            <AdminHomepage />
        ) : (
            <UserHomepage />

        } else {
            <TrainerHomepage />
        }}*/}
    </div>
  )
}

export default HomepageIndex