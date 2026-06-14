import { NavLink } from "react-router-dom";
import ThemeChange from "../components/ThemeChange";

const AuthNavbar = () => {
    return (
        <nav className="w-full h-20 sticky top-0 z-50 bg-white shadow-lg dark:bg-[#020617]/95 backdrop-blur-xl dark:border-b  dark:border-gray-800 px-4 sm:px-6 flex items-center justify-between transition-colors duration-300">

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black text-xl font-black shadow-lg shadow-cyan-500/30">
                    E
                </div>

                <div>

                    <h1 className="text-xl md:text-2xl font-black tracking-wide text-gray-900 dark:text-white">
                        Expense Tracker
                    </h1>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Smart Finance Manager
                    </p>

                </div>

            </NavLink>

            {/* Right Side */}
            <div className="flex items-center gap-4">

                <ThemeChange />

                {/* <NavLink
                    to="/"
                    className="px-5 py-2.5 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
                >
                    Back Home
                </NavLink> */}

            </div>

        </nav>
    );
};

export default AuthNavbar;