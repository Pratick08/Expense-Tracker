
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ThemeChange from "./ThemeChange";
import { useSelector } from 'react-redux'
const Navbar = ({ open, setOpen }) => {
    const user=useSelector((state)=>state.auth.user)
    const firstName=user.username.split(" ")[0]
    // console.log(firstName)

    const hour = new Date().getHours();
    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
                ? "Good Afternoon"
                : "Good Evening";


    return (

        // <nav className="w-full h-20 sticky top-0 z-50 bg-white dark:bg-[#020617]/95 backdrop-blur-xl shadow-lg dark:border-gray-800 px-4 sm:px-6 flex items-center justify-between transition-colors duration-300">

        <nav className="w-full h-20 sticky top-0 z-50 bg-white shadow-lg dark:bg-[#020617]/95 backdrop-blur-xl dark:border-b  dark:border-gray-800 px-4 sm:px-6 flex items-center justify-between transition-colors duration-300">
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col">
                    <h1 className="text-2xl md:text-xl font-bold text-black dark:text-white">
                        {greeting}, {firstName} 👋
                    </h1>
                    <p>
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                {/* MOBILE HEADER */}
                <div className="flex md:hidden items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black text-xl font-black shadow-lg shadow-cyan-500/30">
                        E
                    </div>

                    <div>

                        <h1 className="text-xl font-bold dark:text-white text-black">
                            Expense Tracker
                        </h1>

                        <p className="text-sm dark:text-blue-100 text-gray">
                            Manage finances
                        </p>

                    </div>

                </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-4">
                {/* THEME BUTTON */}
                <ThemeChange />
                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden w-11 h-11 rounded-2xl bg-blue-900 dark:bg-[#0f172a] border border-blue-400 dark:border-gray-700 flex items-center justify-center text-white hover:bg-blue-500/50 dark:hover:bg-[#1e293b] transition-all duration-300"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

            </div>

        </nav>
    );
};

export default Navbar;