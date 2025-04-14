import React, { use } from 'react'
import { useState, useEffect, useContext } from 'react'
import { getUser } from '../../services/userService'
import { authContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

function ProfileDetails() {

    const { user } = useContext(authContext);

    const [userDetail, setUserDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const nav = useNavigate();

    const getUserDetails = async () => {
        try {
            const userData = await getUser(user._id);
            setUserDetail(userData);
            console.log("user detail: ", userData);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <>
        <div>ProfileDetails</div>
        <div>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {userDetail.username}</p>
            <p><strong>Name:</strong> {userDetail.name}</p>
            <p><strong>Role:</strong> {userDetail.role}</p>
        </div>
        {/* only show metrics if not admin */}
        { userDetail.role !== "admin" && (
            <div>
            <h2>Metrics</h2>
            <p><strong>Height:</strong> {userDetail.metrics?.height}</p>
            <p><strong>Weight:</strong> {userDetail.metrics?.weight}</p>
        </div>)
        }
        {/* only show membership if user */}
        {userDetail.role === "user" && (
            <div>
                <h2>Membership</h2>
                <p><strong>Type:</strong> {userDetail.membership?.type}</p>
                <p><strong>Status:</strong> {userDetail.membership?.isActive ? "Active" : "Not Active"}</p>
                <p><strong>Start Date:</strong> {userDetail.membership?.startDate}</p>
                <p><strong>End Date:</strong> {userDetail.membership?.endDate}</p>
            </div>
        )}
        {/* only show trainer details if trainer */}
        {userDetail.role === "trainer" && (
            <div>
                <h2>Trainer Details</h2>
                {/* Add any trainer details here */}
            </div>
        )}
        <button onClick={() => nav(`/edit-user/${userDetail._id}`)}>Edit Profile</button>
    </>

  )
}

export default ProfileDetails