import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Layout() {

    const [open, setOpen] = useState(false);

    return (

        <div className="flex min-h-screen bg-[#020617]">

            {/* SIDEBAR */}
            <div
                className={`
                    fixed lg:sticky lg:top-0 top-0 left-0 z-50
                    h-screen w-65
                    transition-all duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <Sidebar />
            </div>

            {/* OVERLAY */}
            {
                open && (
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )
            }

            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col">

                {/* NAVBAR */}
                <Navbar open={open} setOpen={setOpen} />

                {/* PAGE */}
                <div className="w-full min-h-screen bg-gray-100 dark:bg-[#020617] text-black dark:text-white p-6 transition-colors duration-300">

                    <Outlet />

                </div>

            </div>

        </div>

    );
}

export default Layout;