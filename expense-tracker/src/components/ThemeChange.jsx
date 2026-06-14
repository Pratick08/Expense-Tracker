import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const ThemeChange = () => {
    // false = Light Mode, true = Dark Mode
    const [isDark, setIsDark] = useState(false);

    function handleTheme() {
        setIsDark((prev) => {
            const next = !prev;

            if (next) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            return next;
        });
    }

    return (
        <button
            onClick={handleTheme}
            className="relative flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 hover:scale-110 transition-all duration-300 cursor-pointer overflow-hidden group"
        >
            <span className="relative inline-flex items-center justify-center text-xs sm:text-lg transition-all duration-500">
                
                {/* SUN - Visible in Dark Mode */}
                <span
                    className={`absolute transition-all duration-500 ${
                        isDark
                            ? "opacity-100 rotate-0 scale-100 text-yellow-300"
                            : "opacity-0 -rotate-90 scale-0"
                    }`}
                >
                    <FontAwesomeIcon icon={faSun} />
                </span>

                {/* MOON - Visible in Light Mode */}
                <span
                    className={`absolute transition-all duration-500 ${
                        isDark
                            ? "opacity-0 rotate-90 scale-0"
                            : "opacity-100 rotate-0 scale-100"
                    }`}
                >
                    <FontAwesomeIcon icon={faMoon} />
                </span>
            </span>
        </button>
    );
};

export default ThemeChange;