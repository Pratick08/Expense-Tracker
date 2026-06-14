import {
    faWallet,
    faShieldHalved,
    faBolt,
    faArrowTrendUp,
    faChartColumn,
    faBullseye,


} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeChange from "../components/ThemeChange";
import { NavLink } from "react-router-dom";

const HomePage = () => {

    const features = [
        {
            title: "Track Expenses",
            description:
                "Monitor every transaction with smart analytics and beautiful visual reports.",
            icon: "📊"
        },
        {
            title: "Budget Planning",
            description:
                "Create monthly budgets and stay in complete control of your finances.",
            icon: "💰"
        },
        {
            title: "Financial Insights",
            description:
                "Understand your money habits with modern charts and savings tracking.",
            icon: "📈"
        }
    ];

    const stats = [
        {
            value: "50K+",
            label: "Transactions"
        },
        {
            value: "12K+",
            label: "Active Users"
        },
        {
            value: "99%",
            label: "Budget Accuracy"
        }
    ];

    return (

       <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-[#020617] dark:text-white relative">
            {/* NAVBAR */}
            <nav className="w-full h-20 sticky top-0 z-50 bg-white shadow-lg dark:bg-[#020617]/95 backdrop-blur-xl dark:border-b  dark:border-gray-800 px-4 sm:px-6 flex items-center justify-between transition-colors duration-300">

                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black text-xl font-black shadow-lg shadow-cyan-500/30">
                        E
                    </div>

                    <div>

                        <h1 className="text-2xl font-black tracking-wide text-gray-900 dark:text-white">
                            Expense Tracker
                        </h1>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Smart Finance Manager
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-4">

                    <ThemeChange />

                    <NavLink to="/login">
                        <button className="px-5 py-2.5 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300">
                            Login
                        </button>
                    </NavLink>

                    <button className="px-6 py-2.5 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-105 transition-all duration-300 ">
                        <NavLink to="/dashboard">Get Started</NavLink>
                    </button>

                </div>

            </nav>

            {/* HERO SECTION */}
            <section className="relative z-10 px-6 md:px-12 pt-20 pb-28">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT */}
                    <div>

                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-8">
                            🚀 Simplify Your Financial Journey
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-gray-900 dark:text-white">

                            Manage Money

                            <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Like Never Before
                            </span>

                        </h1>

                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mt-8 max-w-2xl">

                            Take full control of your finances with intelligent expense tracking, budget management, savings insights, and powerful analytics.

                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 mt-10">

                            <button className="px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/30">
                                Start Tracking
                            </button>

                            <button className="px-8 py-4 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300">

                                <NavLink to='/dashboard'>Explore Dashboard</NavLink>

                            </button>

                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-3 gap-5 mt-14">

                            {
                                stats.map((item, index) => (

                                    <div
                                        key={index}
                                        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-5 backdrop-blur-xl shadow-lg dark:shadow-none"
                                    >

                                        <h2 className="text-3xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                            {item.value}
                                        </h2>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                                            {item.label}
                                        </p>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                    {/* RIGHT */}

                </div>

            </section>

            {/* FEATURES */}
            <section className="relative z-10 px-6 md:px-12 pb-28">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">

                        <h2 className="text-4xl md:text-6xl font-black">
                            Powerful Features
                        </h2>

                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-5">
                            Everything you need to manage your financial life smarter and faster.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        {
                            features.map((item, index) => (

                                <div
                                    key={index}
                                    className="group bg-white dark:bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl hover:-translate-y-3 hover:border-cyan-500/40 transition-all duration-500 shadow-xl"
                                >

                                    <div className="w-[72px] h-[72px] rounded-3xl bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-4xl mb-7 shadow-xl shadow-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-3xl font-bold mb-5">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed text-lg">
                                        {item.description}
                                    </p>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </section>

            {/* SMART FINANCE SECTION */}
            <section className="relative z-10 px-6 md:px-12 pb-28">

                <div className="max-w-7xl mx-auto">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT */}
                        <div>

                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                                ⚡ Smart Finance Ecosystem
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black leading-tight text-gray-900 dark:text-white">

                                Everything You Need

                                <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    In One Dashboard
                                </span>

                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mt-6">

                                Track spending, manage budgets, monitor savings, and visualize your financial growth with a futuristic dashboard.

                            </p>

                            <div className="space-y-6 mt-10">

                                <div className="flex gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faChartColumn}
                                            className="text-cyan-400 text-2xl"
                                        />
                                    </div>

                                    <div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Real-Time Analytics
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                                            Understand your expenses with live insights and beautiful charts.
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faArrowTrendUp}
                                            className="text-green-400 text-2xl"
                                        />
                                    </div>

                                    <div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Savings Growth
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                                            Monitor your savings performance and financial improvements.
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-4">

                                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faShieldHalved}
                                            className="text-purple-400 text-2xl"
                                        />
                                    </div>

                                    <div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Secure Experience
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                                            Your financial information stays protected and private.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="relative">

                            <div className="absolute inset-0 bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl rounded-full"></div>

                            <div className="relative rounded-[40px] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

                                <div className="flex items-center justify-between mb-8">

                                    <div>

                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            Finance Overview
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                            Monthly performance
                                        </p>

                                    </div>

                                    <div className="w-14 h-14 rounded-3xl bg-cyan-500/10 flex items-center justify-center">

                                        <FontAwesomeIcon
                                            icon={faBolt}
                                            className="text-cyan-400 text-2xl"
                                        />

                                    </div>

                                </div>

                                <div className="space-y-6">

                                    <div>

                                        <div className="flex justify-between mb-2">

                                            <span className="text-gray-600 dark:text-gray-400">
                                                Savings
                                            </span>

                                            <span className="text-cyan-400">
                                                82%
                                            </span>

                                        </div>

                                        <div className="h-3 rounded-full bg-gray-200 dark:bg-[#111827] overflow-hidden">

                                            <div className="h-full w-[82%] rounded-full bg-linear-to-r from-cyan-400 to-blue-500"></div>

                                        </div>

                                    </div>

                                    <div>

                                        <div className="flex justify-between mb-2">

                                            <span className="text-gray-600 dark:text-gray-400">
                                                Budget Usage
                                            </span>

                                            <span className="text-green-400">
                                                64%
                                            </span>

                                        </div>

                                        <div className="h-3 rounded-full bg-gray-200 dark:bg-[#111827] overflow-hidden">

                                            <div className="h-full w-[64%] rounded-full bg-linear-to-r from-green-400 to-emerald-500"></div>

                                        </div>

                                    </div>

                                    <div>

                                        <div className="flex justify-between mb-2">

                                            <span className="text-gray-600 dark:text-gray-400">
                                                Financial Goals
                                            </span>

                                            <span className="text-purple-400">
                                                91%
                                            </span>

                                        </div>

                                        <div className="h-3 rounded-full bg-gray-200 dark:bg-[#111827] overflow-hidden">

                                            <div className="h-full w-[91%] rounded-full bg-linear-to-r from-purple-400 to-pink-500"></div>

                                        </div>

                                    </div>

                                </div>

                                <div className="grid grid-cols-2 gap-5 mt-10">

                                    <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#111827]/80 p-6">

                                        <div className="flex items-center gap-3">

                                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                                                <FontAwesomeIcon
                                                    icon={faBullseye}
                                                    className="text-cyan-400"
                                                />

                                            </div>

                                            <div>

                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    Active Budgets
                                                </p>

                                                <h3 className="text-3xl font-black mt-1 text-gray-900 dark:text-white">
                                                    12
                                                </h3>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#111827]/80 p-6">

                                        <div className="flex items-center gap-3">

                                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">

                                                <FontAwesomeIcon
                                                    icon={faWallet}
                                                    className="text-green-400"
                                                />

                                            </div>

                                            <div>

                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                    Monthly Savings
                                                </p>

                                                <h3 className="text-3xl font-black mt-1 text-gray-900 dark:text-white">
                                                    ₹42K
                                                </h3>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section className="relative z-10 px-6 md:px-12 pb-24">

                <div className="max-w-7xl mx-auto">

                    <div className="relative overflow-hidden rounded-[40px] border border-gray-200 dark:border-white/10 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-2xl p-10 md:p-16">

                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 dark:bg-cyan-500/10 blur-3xl rounded-full"></div>

                        <div className="relative z-10 text-center">

                            <h2 className="text-4xl md:text-6xl font-black leading-tight text-gray-900 dark:text-white">

                                Ready To Transform

                                <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    Your Finances?
                                </span>

                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto mt-6 leading-relaxed">

                                Start tracking your expenses, managing budgets, and growing your savings with a modern financial dashboard.

                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">

                                <button className="px-10 py-4 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 text-black font-bold hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/30">
                                    Get Started Free
                                </button>

                                <button className="px-10 py-4 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300">
                                    View Dashboard
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    );
};

export default HomePage;