import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { userInstance } from "../utils/axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        setSuccess(""); // Reset success message

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        try {
            const response = await userInstance.post('/api/users/forgot-password', { email });

            if (response.status === 200) {
                setSuccess("Password reset link has been sent to your email.");
            } else {
                setError("Something went wrong, please try again.");
            }
        } catch (error) {
            setError("An error occurred, please try again.", error);
        }
    };

    return (
        <div className="mx-auto mt-24 max-w-md p-8 flex flex-col items-center gap-6 rounded-lg bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-semibold text-center">Forgot Password</h1>
            <div className="flex flex-col gap-4 w-full">
                <label htmlFor="email" className="text-lg">Email</label>
                <CustomInput hint={"email"} value={email} onChange={handleEmailChange} />
            </div>
            <div className="text-red-500 text-sm">{error}</div>
            <div className="text-green-500 text-sm">{success}</div>
            <div className="w-full">
                <button
                    className="w-full rounded-md bg-blue-500 p-4 text-white hover:bg-blue-600"
                    onClick={handleForgotPassword}
                >
                    Send Reset Link
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
