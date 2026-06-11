import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { authLogin } from "../redux/authSlice";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const { error } = useSelector(
        (state) => state.auth
    );
    const onSubmit = async (data) => {
        try {
            const userData = data;
            await dispatch(authLogin(userData))
            navigate('/dashboard')
        } catch (error) {
            toast.error(error);

        }

        // Example:
        // await dispatch(authLogin(data)).unwrap();
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-md bg-[#0f172a] border border-gray-800 rounded-4xl p-8 shadow-xl">

                {/* Logo */}
                <div className="flex items-center justify-center mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center text-4xl">
                        💰
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-gray-400 mt-3 leading-relaxed">
                        Login to continue managing your expenses.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-cyan-500 transition-all duration-300"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value:
                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                        "Please enter a valid email",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm text-gray-300">
                                Password
                            </label>

                            {/* <button
                                type="button"
                                className="text-sm text-cyan-400 hover:text-cyan-300 transition-all duration-300"
                            >
                                Forgot Password?
                            </button> */}
                        </div>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-cyan-500 transition-all duration-300"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Remember Me */}
                    {/* <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-3 text-gray-400 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-600 bg-[#1e293b]"
                                {...register("rememberMe")}
                            />

                            Remember me
                        </label>
                    </div> */}


                    {error && (
                        <div className="text-red-500 mt-2 ">
                            {error}
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-4 rounded-2xl text-black font-bold text-lg disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Logging in..."
                            : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-400 mt-8">
                    Don’t have an account?{" "}
                    <NavLink to="/signup">
                        <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-all duration-300">
                            Sign Up
                        </span>
                    </NavLink>
                </p>

            </div>

        </div>
    );
};

export default Login;