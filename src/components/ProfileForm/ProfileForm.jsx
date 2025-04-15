import React from 'react'
import { authContext } from '../../context/AuthContext';
import { getUser, updateUser } from '../../services/userService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function ProfileForm() {

    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        role: "",
        metrics: {
            height: 0,
            weight: 0,
        },
        membership: {
            type: "",
            isActive: false,
            startDate: "",
            endDate: "",
        }
    });

    const getUserForm = async () => {
        try {
            const userData = await getUser(userId);
            setFormData(userData);
            console.log("user detail: ", userData);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
     }

     const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Handle nested objects (e.g., metrics.height)
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(userId, formData);
            console.log("User updated successfully");
        } catch (err) {
            console.error("Error updating user: ", err);
        }
    }

    useEffect(() => {
        getUserForm();
    }, []);

  return (
    <>
        <div>ProfileForm</div>
        <form onSubmit={handleSubmit}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading user details</p>
            ) : (
                <>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} disabled />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Role:</label>
                        <input type="text" name="role" value={formData.role} disabled />
                    </div>
                    <div>
                        <h3>Metrics</h3>
                        <label>Height:</label>
                        <input
                            type="number"
                            name="metrics.height"
                            value={formData.metrics.height}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    metrics: { ...formData.metrics, height: e.target.value },
                                })
                            }
                        />
                        <label>Weight:</label>
                        <input
                            type="number"
                            name="metrics.weight"
                            value={formData.metrics.weight}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    metrics: { ...formData.metrics, weight: e.target.value },
                                })
                            }
                        />
                    </div>
                    {formData.role === "user" && (
                        <div>
                            <h3>Membership</h3>
                            <label>Type:</label>
                            <input
                                type="text"
                                name="membership.type"
                                value={formData.membership.type}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        membership: { ...formData.membership, type: e.target.value },
                                    })
                                }
                            />
                            <label>Active:</label>
                            <input
                                type="checkbox"
                                name="membership.isActive"
                                checked={formData.membership.isActive}
                                disabled
                            />
                            <label>Start Date:</label>
                            <input
                                type="date"
                                name="membership.startDate"
                                value={formData.membership.startDate}
                                disabled
                            />
                            <label>End Date:</label>
                            <input
                                type="date"
                                name="membership.endDate"
                                value={formData.membership.endDate}
                                disabled
                            />
                        </div>
                    )}
                    <button type="submit">Save Changes</button>
                </>
            )}
        </form>
    </>

    
  )
}

export default ProfileForm