import React from 'react'
import { index } from '../../services/userService'
import { useState, useEffect } from 'react';
import { deleteUser } from '../../services/userService';
import { useNavigate } from 'react-router';

function AdminHomepage() {

    const [users, setUsers] = useState([]);

    const nav = useNavigate();
    
    const handleEdit = (userId) => {
        nav(`/edit-user/${userId}`);
    }

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            getAllUsers(); // Refresh the user list after deletion
            console.log("User deleted successfully");
        } catch (error) {
            console.log("Error deleting user:", error);
        }
    }
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
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td><button onClick={() => handleEdit(user._id)}>Edit</button></td>
                        <td><button onClick={() => handleDelete(user._id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default AdminHomepage