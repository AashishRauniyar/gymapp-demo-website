import { useState } from 'react';
import { userInstance } from '../utils/axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        password: '',
        phone_number: '',
        profile_image: '',
        weight: '',
        height: '',
        gender: 'male', // Default value
        
        fitness_goal: 'maintain', // Default value
        fitness_level: 'Beginner', // Default value
        bmi: '',
        health_issues: '',
        activity_level: 'sedentary', // Default value
        workout_preference: 'mixed', // Default value
    });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await userInstance.post('/api/users/register', formData);
    //         console.log('User registered:', response.data);
    //         if (response.data) {
    //             alert('User registered successfully');
    //             window.location.href = '/login';
    //         }
    //     } catch (error) {
    //         console.log('Error registering user:', error);
    //     }
    // };

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrorMessage(''); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userInstance.post('/api/users/register', formData);
            console.log('User registered:', response.data);
            if (response.data) {
                alert('User registered successfully');
                window.location.href = '/login';
            }
        } catch (error) {
            console.log('Error registering user:', error);
            if (error.response) {
                // Check if the error is related to unique constraints
                const errorData = error.response.data;
                if (errorData.error) {
                    setErrorMessage(errorData.error);
                } else {
                    setErrorMessage('An error occurred during registration. Please try again.');
                }
            } else {
                setErrorMessage('Server is not responding. Please try again later.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="full_name">Full Name</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="phone_number">Phone Number</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="profile_image">Profile Image URL</label>
                    <input
                        type="text"
                        id="profile_image"
                        name="profile_image"
                        value={formData.profile_image}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="weight">Weight (kg)</label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="height">Height (cm)</label>
                    <input
                        type="number"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="fitness_goal">Fitness Goal</label>
                    <select
                        id="fitness_goal"
                        name="fitness_goal"
                        value={formData.fitness_goal}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="gain">Gain</option>
                        <option value="maintain">Maintain</option>
                        <option value="loss">Loss</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="fitness_level">Fitness Level</label>
                    <select
                        id="fitness_level"
                        name="fitness_level"
                        value={formData.fitness_level}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="activity_level">Activity Level</label>
                    <select
                        id="activity_level"
                        name="activity_level"
                        value={formData.activity_level}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="sedentary">Sedentary</option>
                        <option value="lightly_active">Lightly Active</option>
                        <option value="active">Active</option>
                        <option value="very_active">Very Active</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="workout_preference">Workout Preference</label>
                    <select
                        id="workout_preference"
                        name="workout_preference"
                        value={formData.workout_preference}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                        <option value="strength">Strength</option>
                        <option value="cardio">Cardio</option>
                        <option value="mixed">Mixed</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="health_issues">Health Issues</label>
                    <textarea
                        id="health_issues"
                        name="health_issues"
                        value={formData.health_issues}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
