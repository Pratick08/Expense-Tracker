import { useState } from "react";
import { NavLink } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeChange from "./ThemeChange";

const HomePageNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 h-16 sm:h-20 bg-white dark:bg-[#020617]/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">

                <div className="max-w-full  px-4  h-full flex items-center justify-between">

                    {/* Logo */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black font-black text-lg sm:text-xl shadow-lg shadow-cyan-500/30">
                            E
                        </div>

                        <div>
                            <h1 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">
                                Expense Tracker
                            </h1>

                            <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                                Smart Finance Manager
                            </p>
                        </div>
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-4">

                        <ThemeChange />

                        <NavLink to="/login">
                            <button className="px-5 py-2.5 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all">
                                Login
                            </button>
                        </NavLink>

                        <NavLink to="/dashboard">
                            <button className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-105 transition-all">
                                Get Started
                            </button>
                        </NavLink>

                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden w-11 h-11 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center"
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            className="text-xl text-gray-800 dark:text-white"
                        />
                    </button>

                </div>

            </nav>

            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300
                ${isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 h-screen w-[300px] bg-white dark:bg-[#020617]
                z-[60] shadow-2xl transition-transform duration-300
                ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >

                {/* Drawer Header */}
                <div className="h-20 px-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black font-black">
                            E
                        </div>

                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white">
                                Expense Tracker
                            </h2>

                            <p className="text-xs text-gray-500">
                                Finance Manager
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="text-xl text-gray-700 dark:text-white"
                        />
                    </button>

                </div>

                {/* Drawer Links */}
                <div className="p-5 space-y-3">

                    <NavLink
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-white"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-white"
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-white"
                    >
                        Dashboard
                    </NavLink>

                    {/* Theme */}
                    <div className="px-4 py-3 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-slate-900 mt-4">
                        <span className="text-gray-800 dark:text-white">
                            Theme
                        </span>

                        <ThemeChange />
                    </div>

                    {/* CTA */}
                    <NavLink
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                    >
                        <button className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold">
                            Get Started
                        </button>
                    </NavLink>

                </div>

            </div>
        </>
    );
};

export default HomePageNav;