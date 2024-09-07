import { useEffect, useState } from "react";
import { userInstance } from "../utils/axios";

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found. Please log in again.');
                }

                const response = await userInstance.get('/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);

            } catch (error) {
                setError(`Error fetching user data: ${error.message}`);
            }
        };

        getUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please log in again.');
            }

            await userInstance.put('/api/users/profile', user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            setError(`Error updating profile: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold text-center mb-6">Profile Page</h1>

            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}

            <div className="space-y-4">
                {Object.entries(user).map(([key, value]) => (
                    key !== 'password' && (
                        <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                            {key === 'gender' ? (
                                <select
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            ) : (
                                <input
                                    type={key === 'email' ? 'email' : 'text'}
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                />
                            )}
                        </div>
                    )
                ))}

                <div className="flex justify-between items-center mt-6">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
