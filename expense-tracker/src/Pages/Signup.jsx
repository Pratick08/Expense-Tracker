import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { authregister } from "../redux/authSlice";
import { NavLink, useNavigate } from "react-router";

const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();


    const { error } = useSelector(
        (state) => state.auth
    );
    const onSubmit = async (data) => {
        const userData = data;
        const result = await dispatch(authregister(userData))
        if (authregister.fulfilled.match(result)) {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Start managing your finances today
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Username */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Minimum 3 characters required",
                                },
                            })}
                        />

                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value:
                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                        "Enter a valid email",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-cyan-500"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Minimum 6 characters required",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="text-red-500 mt-2 ">
                            {error}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-black"
                    >
                        {isSubmitting
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-slate-400 text-sm">
                        Already have an account?
                        <NavLink to='/login'><span className="text-cyan-400 ml-1 cursor-pointer hover:underline">
                            Sign In
                        </span></NavLink>
                </p>
            </div>
        </div>
        </div >
    );
};

export default Signup;