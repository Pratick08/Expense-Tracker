import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const ThemeChange = () => {
    const [theme, settheme] = useState(true);

    function handleTheme() {

        if (theme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        settheme(!theme);
    }
    return (
 <button
                    onClick={handleTheme}
                    className="relative flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-blue-500/30 dark:bg-[#25262b] border border-blue-400 dark:border-gray-700 shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer overflow-hidden group"
                >

                    {/* Glow */}
                    <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/20 to-transparent dark:from-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                    {/* Icon */}
                    <span className="relative inline-flex items-center justify-center text-xs sm:text-lg transition-all duration-500">

                        {/* SUN */}
                        <span
                            className={`absolute transition-all duration-500 ${theme
                                ? "opacity-100 rotate-0 scale-100 text-yellow-300"
                                : "opacity-0 -rotate-90 scale-0"
                                }`}
                        >
                            <FontAwesomeIcon icon={faSun} />
                        </span>

                        {/* MOON */}
                        <span
                            className={`absolute transition-all duration-500 ${theme
                                ? "opacity-0 rotate-90 scale-0"
                                : "opacity-100 rotate-0 scale-100"
                                }`}
                        >
                            🌙
                        </span>

                    </span>

                </button>
    )
}

export default ThemeChange
