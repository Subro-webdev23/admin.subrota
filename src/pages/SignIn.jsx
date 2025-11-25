import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { loginAdmin } from "../api/api";

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill in all fields",
                confirmButtonColor: "#2563eb",
            });
            return;
        }

        setIsLoading(true);
        try {
            // 🔐 Call login API → returns token
            const response = await loginAdmin(formData.email, formData.password);
            // console.log(response);


            // Token already saved inside loginAdmin (in localStorage)
            // So no need to save here again

            Swal.fire({
                icon: "success",
                title: "Sign In Successful",
                text: `Welcome back!`,
                confirmButtonColor: "#2563eb",
            });

            // Reset form
            setFormData({ email: "", password: "" });

            // Navigate to dashboard
            navigate("/dashboard");

        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || "Sign in failed. Please try again.";
            Swal.fire({
                icon: "error",
                title: "Sign In Failed",
                text: errorMessage,
                confirmButtonColor: "#2563eb",
            });
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4 relative">
            {/* Back to Home Link */}
            <div className="absolute top-6 left-6">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium text-sm group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Sign in to access your dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </motion.button>
                </form>

                <div className="mt-6">
                    <p className="text-center text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate("/auth")}
                            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition"
                        >
                            Create one
                        </button>
                    </p>
                </div>


                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-center text-xs text-gray-500">
                        Demo: Use any email and password
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignIn;