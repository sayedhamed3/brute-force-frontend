import React from "react";
import { index } from "../../services/userService";
import { useState, useEffect } from "react";
import { deleteUser } from "../../services/userService";
import { useNavigate } from "react-router";
import "../../../src/App.css";
import "./AdminHomepage.css";

function AdminHomepage() {
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(null)

  const nav = useNavigate();

  const handleEdit = (userId) => {
    nav(`/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      getAllUsers(); // Refresh the user list after deletion
      console.log("User deleted successfully");
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

const confirmDelete = (userId) => {
  setShowConfirm(userId)
}

const cancelDelete = () => {
  setShowConfirm(null)
}

  const getAllUsers = async () => {
    try {
      const allUsers = await index();
      console.log("ALL USERS:", allUsers);
      setUsers(allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="admin-homepage">
      <h1>Admin Homepage</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user._id)}>Edit</button>
              </td>
              <td>
                {showConfirm === user._id ? (
                  <div className="delete-confirmation">
                    <span>Are you sure?</span>
                    <button 
                      className="confirm-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Yes
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={cancelDelete}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button 
                    className="delete-btn"
                    onClick={() => confirmDelete(user._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminHomepage;
