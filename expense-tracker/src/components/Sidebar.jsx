import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from '../assets/avatar/default.jpg'
import avatar1 from '../assets/avatar/AvatarMaker1.png'
import avatar2 from '../assets/avatar/AvatarMaker2.png'
import avatar3 from '../assets/avatar/AvatarMaker3.png'
import avatar4 from '../assets/avatar/AvatarMaker4.png'
import avatar5 from '../assets/avatar/AvatarMaker5.png'
import avatar6 from '../assets/avatar/AvatarMaker6.png'
// import { useState } from "react";
const Sidebar = () => {
    const user = useSelector((state) => state.auth.user);
    // const [selectAvatar,setSelectAvatar]=useState("");
    // const letter = user.username.slice(" ")[0]
    const dispatch = useDispatch();
    const navigate = useNavigate()
    function handleLogout() {
        dispatch(logout())
        navigate('/login')
    }
    const avatarmap = [defaultAvatar, avatar1, avatar2, avatar3, avatar4, avatar5, avatar6]
    const selectAvatar = avatarmap[user.avatar];
    console.log("userAvatar", user.avatar)
    return (
        <aside className="w-65 h-screen sticky top-0 bg-white dark:bg-[#020617]/95 border-r border-blue-200 dark:border-gray-800 flex flex-col justify-between px-5 py-6">

            {/* Top Section */}
            <div>
                {/* Logo */}
                <div className="flex items-center gap-3 mb-12">

                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-cyan-500/20">
                        E
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-black dark:text-white">
                            Expense Tracker
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage finances
                        </p>
                    </div>

                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${isActive
                                ? "bg-cyan-500 text-white shadow-md"
                                : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-[#1e293b]"
                            }`
                        }
                    >
                        <span className="text-lg">🏠</span>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/transaction"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${isActive
                                ? "bg-cyan-500 text-white shadow-md"
                                : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-[#1e293b]"
                            }`
                        }
                    >
                        <span className="text-lg">💸</span>
                        <span>Transactions</span>
                    </NavLink>

                    <NavLink
                        to="/analytics"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${isActive
                                ? "bg-cyan-500 text-white shadow-md"
                                : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-[#1e293b]"
                            }`
                        }
                    >
                        <span className="text-lg">📊</span>
                        <span>Analytics</span>
                    </NavLink>

                    <NavLink
                        to="/budget"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${isActive
                                ? "bg-cyan-500 text-white shadow-md"
                                : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-[#1e293b]"
                            }`
                        }
                    >
                        <span className="text-lg">🎯</span>
                        <span>Budgets</span>
                    </NavLink>

                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${isActive
                                ? "bg-cyan-500 text-white shadow-md"
                                : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-[#1e293b]"
                            }`
                        }
                    >
                        <span className="text-lg">👤</span>
                        <span>Profile</span>
                    </NavLink>

                </nav>

            </div>

            {/* Bottom Logout Section */}
            <div className="border-t border-blue-200 dark:border-gray-800 pt-5">

                <button
                    className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-100 dark:hover:bg-[#1e293b] transition-all duration-300"
                    onClick={handleLogout}
                >

                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                            src={selectAvatar}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0 text-left">

                        <h3 className="text-sm font-semibold text-black dark:text-white truncate">
                            {user.username}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                        </p>

                    </div>

                    {/* Logout Icon */}
                    <div className="text-gray-500 dark:text-gray-400 text-lg shrink-0">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </div>

                </button>

            </div>

        </aside>
    );
};

export default Sidebar;