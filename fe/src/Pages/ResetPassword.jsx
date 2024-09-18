import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { useParams } from "react-router-dom"; // To capture the token from the URL
import { userInstance } from "../utils/axios";

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from the URL
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        setSuccess(""); // Reset success message

        if (!password || !confirmPassword) {
            setError("Please fill out all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // const response = await userInstance.post(`/api/users/reset-password/${token}`, { password });
            const response = await userInstance.post(`/api/users/reset-password/${token}`, { password });

            if (response.status === 200) {
                setSuccess("Password has been reset successfully.");
            } else {
                setError("Password reset failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.", error);
        }
    };

    return (
        <div className="mx-auto mt-24 max-w-md p-8 flex flex-col items-center gap-6 rounded-lg bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-semibold text-center">Reset Password</h1>
            <div className="flex flex-col gap-4 w-full">
                <label htmlFor="password" className="text-lg">New Password</label>
                <CustomInput type="password" hint={"New Password"} value={password} onChange={handlePasswordChange} />

                <label htmlFor="confirmPassword" className="text-lg">Confirm Password</label>
                <CustomInput type="password" hint={"Confirm Password"} value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>
            <div className="text-red-500 text-sm">{error}</div>
            <div className="text-green-500 text-sm">{success}</div>
            <div className="w-full">
                <button
                    className="w-full rounded-md bg-blue-500 p-4 text-white hover:bg-blue-600"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
