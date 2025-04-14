import React from 'react'
import { index } from '../../services/userService'
import { useState, useEffect } from 'react';

function AdminHomepage() {

    const [users, setUsers] = useState([]);

    const getAllUsers = async() => {
        try {
            const allUsers = await index();
            console.log("ALL USERS:" ,allUsers);
            setUsers(allUsers);
        } catch (error) {
            console.log(error);
        }
    } 

    useEffect(() => {
        getAllUsers();
    }, []);

  return (
    <div>
        <div>Admin Homepage </div>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td><button>Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default AdminHomepage