import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from "../redux/authSlice";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';
import AuthNavbar from "../components/AuthNavbar";
import authBg from '../assets/auth-background.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const { error } = useSelector((state) => state.auth);
    const [isPassword, setIsPassword] =useState(true)
    const onSubmit = async (data) => {
        try {
            await dispatch(authLogin(data));
            navigate('/dashboard');
        } catch (error) {
            toast.error(error?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
            <AuthNavbar />

            <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-10 overflow-hidden">

                {/* Left Side: Premium Feature/Branding Panel (Hidden on Mobile) */}
                <div className="relative hidden lg:flex lg:col-span-5 items-center justify-center bg-gray-100 dark:bg-[#090d16]  overflow-hidden">
                    {/* Background ambient glows */}
                    <img src={authBg} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Right Side: Elegant Login Form Column */}
                <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-10 md:p-14 relative bg-gray-100 dark:bg-[#090d16]">

                    <div className="w-full max-w-115 space-y-8">
                        {/* Header Content */}
                        <div className="space-y-3">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                Welcome Back
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                Welcome back! Please enter your details.
                            </p>
                        </div>

                        {/* Form Container */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:focus:ring-cyan-500/5 transition-all duration-200 shadow-sm"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Please enter a valid email address",
                                            },
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-rose-500 dark:text-rose-400 text-xs font-medium flex items-center gap-1 mt-1">
                                        ⚠ {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Password
                                    </label>
                                    {/* <NavLink to="/forgot-password" className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
                                        Forgot password?
                                    </NavLink> */}
                                </div>
                                <div className="relative">
                                    <input
                                        type={isPassword ? "password" : "text"}
                                        placeholder="••••••••"
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:focus:ring-cyan-500/5 transition-all duration-200 shadow-sm"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                    />
                                    <FontAwesomeIcon
                                        icon={isPassword ? faEye : faEyeSlash}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-cyan-500 transition-colors"
                                        onClick={() => setIsPassword(!isPassword)}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-rose-500 dark:text-rose-400 text-xs font-medium flex items-center gap-1 mt-1">
                                        ⚠ {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Backend error box if authentication fails */}
                            {error && (
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 dark:text-rose-400 text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 active:scale-[0.99] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Securing session...
                                    </>
                                ) : (
                                    "Sign In to Dashboard"
                                )}
                            </button>
                        </form>

                        {/* Bottom Link Options */}
                        <div className="text-center pt-2">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                New to our platform?{" "}
                                <NavLink to="/signup" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold transition-colors duration-200">
                                    Create an account
                                </NavLink>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;