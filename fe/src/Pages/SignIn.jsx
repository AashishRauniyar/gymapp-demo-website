import CustomInput from "../components/CustomInput"
import { useState } from "react"
import { userInstance } from "../utils/axios";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message
        setSuccess(""); // Reset success message

        if (!email || !password) {
            setError("Please fill out all fields");
            return;
        }

        try {
            const response = await userInstance.post('/api/users/login', { email, password });

            // Assuming the server responds with a token or success message
            if (response.status === 200 && response.data.token) {
                setSuccess("Login successful!");
                // Save the token (e.g., in localStorage or context)
                localStorage.setItem("token", response.data.token);
                // Optionally redirect the user
                window.location.href = "/dashboard"; // Replace with your route
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };


    return (
        <>
            <>
                <div className="mx-auto mt-24 max-w-md p-8 flex flex-col items-center gap-6 rounded-lg bg-slate-100 shadow-lg">
                    <div>
                        <h1 className="text-3xl font-semibold text-center">Login</h1>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="email" className="text-lg">Email</label>
                        <CustomInput hint={"email"} type="email" value={email} onChange={handleEmailChange} />

                        <label htmlFor="password" className="text-lg">Password</label>
                        <CustomInput type="password" hint={"password"} value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="text-red-500 text-sm">{error}</div>
                    <div className="text-green-500 text-sm">{success}</div>
                    <div className="text-sm">
                        Don’t have an account?
                        <a className="text-blue-500 ml-1 hover:underline" href="/signup">
                            Signup
                        </a>
                    </div>
                    <div className="w-full">
                        <button
                            className="w-full rounded-md bg-blue-500 p-4 text-white hover:bg-blue-600"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </>

        </>
    )
}

export default SignIn