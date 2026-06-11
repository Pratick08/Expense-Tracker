import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom'
import { updateProfile, updateAvatar, updatePassword, deleteAccount } from "../redux/authSlice";
import defaultAvatar from '../assets/avatar/default.jpg'
import avatar1 from '../assets/avatar/AvatarMaker1.png'
import avatar2 from '../assets/avatar/AvatarMaker2.png'
import avatar3 from '../assets/avatar/AvatarMaker3.png'
import avatar4 from '../assets/avatar/AvatarMaker4.png'
import avatar5 from '../assets/avatar/AvatarMaker5.png'
import avatar6 from '../assets/avatar/AvatarMaker6.png'
import toast from "react-hot-toast";

const Profile = () => {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [newPassError, setNewPassError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [selectAvatar, setSelectAvatar] = useState(user.avatar)
    const avatars = [defaultAvatar, avatar1, avatar2, avatar3, avatar4, avatar5, avatar6]
    function handleSaveChanges() {
        const userDetails = {
            username,
            email
        }
        if (username.trim() != "" && email.trim() != "") {
            dispatch(updateProfile(userDetails))
        } else {
            toast.error("Please Fill All The Fields")
        }
        setUsername("");
        setEmail("");
    }
    function handleAvatar() {
        dispatch(updateAvatar({
            avatar: selectAvatar
        }))
    }

    //CHANGING PASSWORD
    function handlePassword() {
        if (currentPass.trim() != "" && newPass.trim() != "" && confirmPass != "") {
            if (newPass != confirmPass) {
                toast.error("New password and confirm password do not match")
                return;
            }
            const passDetails = {
                currentPass,
                confirmPass
            }
            dispatch(updatePassword(passDetails))
        } else {
            toast.error("Please Fill All The Fields")
        }
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("")
    }

    function handleDeleteAccount() {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (!confirmed) return;
        dispatch(deleteAccount());
        navigate('/signup')

    }
    return (
        <div className="max-w-7xl mx-auto space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-4xl font-bold text-black dark:text-white">
                    Profile Settings
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Manage your account information and security settings.
                </p>
            </div>
            {/* TOP SECTION */}
            <div className="grid lg:grid-cols-12 gap-6">

                {/* PROFILE CARD */}
                <div className="lg:col-span-4 bg-white dark:bg-[#0f172a] border border-blue-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg">

                    <div className="text-center mb-6">

                        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg">

                            <img
                                src={avatars[selectAvatar]}
                                alt="Selected Avatar"
                                className="w-full h-full object-cover"
                            />

                        </div>

                        <h2 className="mt-4 text-xl font-bold text-black dark:text-white">
                            Avatar
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Choose your profile avatar
                        </p>

                    </div>

                    <div className="grid grid-cols-3 gap-3">

                        {avatars.map((avatar, index) => (

                            <button
                                key={index}
                                onClick={() => setSelectAvatar(index)}
                                className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${selectAvatar === index
                                    ? "border-cyan-500"
                                    : "border-transparent"
                                    }`}
                            >

                                <img
                                    src={avatar}
                                    alt={`Avatar ${index + 1}`}
                                    className="w-full aspect-square object-cover"
                                />

                                {selectAvatar === index && (
                                    <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">

                                        <div className="w-8 h-8 rounded-full bg-cyan-500 text-black font-bold flex items-center justify-center">
                                            ✓
                                        </div>

                                    </div>
                                )}

                            </button>

                        ))}

                    </div>

                    <button className="w-full mt-5 py-3 rounded-2xl bg-cyan-500 text-black font-semibold hover:scale-[1.02] transition-all" onClick={handleAvatar}>
                        Save Avatar
                    </button>

                </div>

                {/* PERSONAL INFORMATION + SECURITY */}
                <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] border border-blue-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg">

                    {/* Personal Information */}
                    <h2 className="text-xl font-semibold text-black dark:text-white mb-6">
                        Personal Information
                    </h2>

                    <div className="space-y-5">

                        <div>
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={username}
                                placeholder="Enter your name"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setUsername(value);

                                    if (value.length > 0 && value.length < 3) {
                                        setUsernameError("Name must be at least 3 characters");
                                    } else {
                                        setUsernameError("");
                                    }
                                }}
                                className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500"
                            />

                            {usernameError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {usernameError}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={email}
                                placeholder="Enter your email"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setEmail(value);

                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                    if (value.length === 0) {
                                        setEmailError("Email is required");
                                    } else if (!emailRegex.test(value)) {
                                        setEmailError("Enter a valid email");
                                    } else {
                                        setEmailError("");
                                    }
                                }}
                                className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500"
                            />

                            {emailError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {emailError}
                                </p>
                            )}

                            <button
                                className="px-8 mt-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-2xl text-black font-semibold transition-all"
                                onClick={(e) => {
                                    e.preventDefault();

                                    if (!username || username.length < 3) {
                                        toast.error("Name must be at least 3 characters");
                                        return;
                                    }

                                    if (!email || emailError) {
                                        toast.error("Enter a valid email");
                                        return;
                                    }

                                    handleSaveChanges();
                                }}
                            >
                                Save Profile
                            </button>
                        </div>

                    </div>

                    {/* Divider */}
                    <div className="my-8 border-t border-blue-200 dark:border-gray-800"></div>

                    {/* Security Settings */}
                    <div>

                        <div className="flex items-center gap-3 mb-6">

                            <FontAwesomeIcon
                                icon={faLock}
                                className="text-cyan-500"
                            />

                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                Security Settings
                            </h2>

                        </div>

                        <div className="grid md:grid-cols-3 gap-5">

                            <input
                                value={currentPass}
                                onChange={(e) => setCurrentPass(e.target.value)}
                                type="password"
                                placeholder="Current Password"
                                className="bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500"
                            />

                            <input
                                value={newPass}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNewPass(value);
                                    if (value.length === 0) {
                                        setNewPassError("Password is required");
                                    } else if (value.length < 6) {
                                        setNewPassError("Password must be at least 6 characters");
                                    } else {
                                        setNewPassError("");
                                    }
                                }}
                                type="password"
                                placeholder="New Password"
                                className="bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl 
                                 px-4 py-3 outline-none focus:border-cyan-500"
                            />

                            {newPassError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {newPassError}
                                </p>
                            )}

                            <input
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                type="password"
                                placeholder="Confirm Password"
                                className="bg-gray-100 dark:bg-[#1e293b] border border-gray-300
                                 dark:border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-cyan-500"
                            />

                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-4">


                        <button className="px-8  py-3 bg-cyan-500 hover:bg-cyan-600 rounded-2xl
                         text-black font-semibold transition-all" onClick={handlePassword}>
                            Update Password
                        </button>

                    </div>

                </div>

            </div>

            {/* BOTTOM SECTION */}
            <div className="grid lg:grid-cols-2 gap-6">

                {/* ACCOUNT STATS */}
                <div className="bg-white dark:bg-[#0f172a] border border-blue-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-all duration-300">

                    <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">
                        Account Statistics
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="bg-gray-100 dark:bg-[#1e293b] rounded-2xl p-4">
                            <p className="text-gray-500 text-sm">
                                Transactions
                            </p>

                            <h3 className="text-2xl font-bold mt-2 text-black dark:text-white">
                                245
                            </h3>
                        </div>

                        <div className="bg-gray-100 dark:bg-[#1e293b] rounded-2xl p-4">
                            <p className="text-gray-500 text-sm">
                                Budgets
                            </p>

                            <h3 className="text-2xl font-bold mt-2 text-black dark:text-white">
                                12
                            </h3>
                        </div>

                        <div className="bg-gray-100 dark:bg-[#1e293b] rounded-2xl p-4">
                            <p className="text-gray-500 text-sm">
                                Total Income
                            </p>

                            <h3 className="text-2xl font-bold mt-2 text-green-500">
                                ₹2.4L
                            </h3>
                        </div>

                        <div className="bg-gray-100 dark:bg-[#1e293b] rounded-2xl p-4">
                            <p className="text-gray-500 text-sm">
                                Total Expenses
                            </p>

                            <h3 className="text-2xl font-bold mt-2 text-red-500">
                                ₹1.5L
                            </h3>
                        </div>

                    </div>

                </div>

                {/* DANGER ZONE */}
                <div className="bg-white dark:bg-[#0f172a] border border-red-500/20 rounded-3xl p-6 shadow-lg transition-all duration-300">

                    <h2 className="text-xl font-semibold text-red-500 mb-6">
                        Danger Zone
                    </h2>

                    <div className="space-y-4">

                        <button className="w-full p-4 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all">
                            Logout From All Devices
                        </button>

                        <button className="w-full p-4 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                            onClick={handleDeleteAccount}>

                            <FontAwesomeIcon icon={faTrash} />

                            Delete Account

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;