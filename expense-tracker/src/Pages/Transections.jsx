import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, fetchAllTransactions, fetchTransactions } from "../redux/expenceSlice";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LineChart from "../components/LineChart"
import {
    faTrash,
    faUtensils,
    faPlane,
    faBagShopping,
    faFileInvoiceDollar,
    faMoneyBill,
    faQuestion,
    faPenToSquare
} from "@fortawesome/free-solid-svg-icons";

const Transections = () => {
    const transactionDatas = useSelector((state) => state.expence.transactionDatas);
    const transactions = useSelector((state) => state.expence.transactions);
    console.log(transactions)
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [month, setMonth] = useState(
        new Date().getMonth() + 1
    )

    const [year, setYear] = useState(
        new Date().getFullYear()
    )

    useEffect(() => {
        dispatch(fetchAllTransactions())
        dispatch(fetchTransactions(
            {
                month,
                year
            }
        ));
    }, [dispatch, month, year]);

    const filteredTransactions = transactionDatas.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase());

        const matchesType =
            filterType === "all" ? true : item.type === filterType;

        const matchesCategory =
            filterCategory === "all" ? true : item.category === filterCategory;

        return matchesSearch && matchesType && matchesCategory;
    });

    function handleDelete(id) {
        dispatch(deleteTransaction(id));
    }

    // CATEGORY ICONS ONLY (NO COLORS HERE ANYMORE)
    const categoryConfig = {
        food: faUtensils,
        travel: faPlane,
        shopping: faBagShopping,
        bills: faFileInvoiceDollar,
        salary: faMoneyBill,
    };

    return (
        <div className="w-full min-h-screen dark:bg-[#020617] text-black dark:text-white p-6 transition-colors duration-300">
            {/* {Header Section} */}
            <div className="mb-8">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>

                        <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                            Transactions
                        </h1>

                        <p className="mt-2 text-gray-600 dark:text-slate-400">
                            Manage all your income and expenses.
                        </p>

                    </div>

                    <NavLink
                        to="/dashboard"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                    >
                        + Add Transaction
                    </NavLink>

                </div>

            </div>

            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl mb-8 p-6 shadow-lg h-full">
                <div class="mb-6">
                    <h2 class="text-xl font-bold text-black dark:text-white">Transactions Trend
                    </h2>
                    <p class="text-gray-600 dark:text-slate-400 mt-2">Monthly Income vs Expense
                    </p>
                </div>
                <LineChart transactions={transactions} />

            </div>

            {/* FILTERS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg mb-8 transition-colors duration-300">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">

                    <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white">
                            Filters
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                            Search and filter transactions
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setSearch("");
                            setFilterType("all");
                            setFilterCategory("all");
                            setMonth(new Date().getMonth() + 1);
                            setYear(new Date().getFullYear());
                        }}
                        className="
                flex items-center gap-2
                px-5 py-3
                rounded-2xl
                border border-gray-300 dark:border-slate-700
                bg-gray-50 dark:bg-[#111827]
                hover:bg-cyan-50
                dark:hover:bg-cyan-500/10
                hover:border-cyan-500
                text-gray-700 dark:text-slate-300
                hover:text-cyan-500
                transition-all duration-300
                font-medium
            "
                    >
                        ↺ Reset Filters
                    </button>

                </div>

                {/* Filters */}
                <div className="flex flex-wrap xl:flex-nowrap gap-4">

                    {/* Search */}
                    <div className="flex-2 min-w-65">

                        <input
                            type="text"
                            value={search}
                            placeholder="Search transactions..."
                            className="
                    w-full
                    bg-gray-100 dark:bg-[#1e293b]
                    border border-gray-300 dark:border-gray-700
                    rounded-2xl
                    px-4 py-4
                    text-black dark:text-white
                    outline-none
                    focus:border-cyan-500
                    transition-all duration-300
                "
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    {/* Type */}
                    <div className="flex-1 min-w-37.5">

                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="
                    w-full
                    bg-gray-100 dark:bg-[#1e293b]
                    border border-gray-300 dark:border-gray-700
                    rounded-2xl
                    px-4 py-4
                    text-black dark:text-white
                    outline-none
                    focus:border-cyan-500
                    transition-all duration-300
                "
                        >
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                    </div>

                    {/* Category */}
                    <div className="flex-1 min-w-42.5">

                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="
                    w-full
                    bg-gray-100 dark:bg-[#1e293b]
                    border border-gray-300 dark:border-gray-700
                    rounded-2xl
                    px-4 py-4
                    text-black dark:text-white
                    outline-none
                    focus:border-cyan-500
                    transition-all duration-300
                "
                        >
                            <option value="all">All Categories</option>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="shopping">Shopping</option>
                            <option value="bills">Bills</option>
                            <option value="salary">Salary</option>
                        </select>

                    </div>

                    {/* Month */}
                    <div className="flex-1 min-w-37.5">

                        <select
                            value={month}
                            onChange={(e) => setMonth(Number(e.target.value))}
                            className="
                    w-full
                    bg-gray-100 dark:bg-[#1e293b]
                    border border-gray-300 dark:border-gray-700
                    rounded-2xl
                    px-4 py-4
                    text-black dark:text-white
                    outline-none
                    focus:border-cyan-500
                    transition-all duration-300
                "
                        >
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                        </select>

                    </div>

                    {/* Year */}
                    <div className="flex-1 min-w-35">

                        <select
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="
                    w-full
                    bg-gray-100 dark:bg-[#1e293b]
                    border border-gray-300 dark:border-gray-700
                    rounded-2xl
                    px-4 py-4
                    text-black dark:text-white
                    outline-none
                    focus:border-cyan-500
                    transition-all duration-300
                "
                        >
                            <option value={2026}>2026</option>
                            <option value={2025}>2025</option>
                            <option value={2024}>2024</option>
                            <option value={2023}>2023</option>
                        </select>

                    </div>

                </div>

            </div>

            {/* TABLE HEADER */}
            <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-linear-to-r dark:from-[#0b1220] dark:to-[#0f172a] rounded-t-2xl shadow-sm dark:shadow-none transition-colors duration-300">
                <h3 className="text-gray-700 dark:text-gray-400 text-sm font-semibold">Transaction</h3>
                <h3 className="text-gray-700 dark:text-gray-400 text-sm font-semibold">Category</h3>
                <h3 className="text-gray-700 dark:text-gray-400 text-sm font-semibold text-center">Date</h3>
                <h3 className="text-gray-700 dark:text-gray-400 text-sm font-semibold text-center">Amount</h3>
                <h3 className="text-gray-700 dark:text-gray-400 text-sm text-center font-semibold">Actions</h3>
            </div>

            {/* BODY */}
            <div className="bg-white dark:bg-[#0f172a] rounded-b-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-300">

                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((t) => (
                        <div
                            key={t._id}
                            className="border-b border-gray-200 dark:border-gray-800 lg:border-none p-4 lg:p-0 transition-colors duration-300"
                        >

                            {/* MOBILE CARD */}
                            <div className="lg:hidden bg-gray-100 dark:bg-[#111827] rounded-xl p-4 mb-3 transition-colors duration-300">

                                <div className="flex justify-between items-start">

                                    <div className="flex items-center gap-3">

                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === "expense" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                                            <FontAwesomeIcon icon={categoryConfig[t.category] || faQuestion} />
                                        </div>

                                        <div>
                                            <h2 className="text-black dark:text-white font-semibold">
                                                {t.title}
                                            </h2>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {t.category}
                                            </p>
                                        </div>

                                    </div>

                                    <div className={`font-semibold ${t.type === "income" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                                        {t.type === "income" ? "+₹" : "-₹"}
                                        {Number(t.amount).toLocaleString()}
                                    </div>

                                </div>

                                <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                                    <span>📅{new Date(t.date).toLocaleDateString("en-GB")}</span>

                                    <div className="flex gap-3">

                                        <NavLink to={`/?edit=${t._id}`} className="text-cyan-500 dark:text-cyan-400">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </NavLink>

                                        <button onClick={() => handleDelete(t._id)} className="text-red-500 dark:text-red-400">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>

                                    </div>

                                </div>

                            </div>

                            {/* DESKTOP ROW */}
                            <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 lg:px-6 py-5 hover:bg-gray-100 dark:hover:bg-[#111827] transition-all duration-200 group">

                                {/* TRANSACTION */}
                                <div className="flex items-center gap-4">

                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.type === "expense" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                                        <FontAwesomeIcon icon={categoryConfig[t.category] || faQuestion} />
                                    </div>

                                    <div>
                                        <h2 className="text-black dark:text-white font-semibold group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition">
                                            {t.title}
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Personal Transaction
                                        </p>
                                    </div>

                                </div>

                                {/* CATEGORY */}
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize bg-gray-200 dark:bg-gray-800/40 px-3 py-1 rounded-lg">
                                        {t.category}
                                    </span>
                                </div>

                                {/* DATE */}
                                <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                                    📅 {new Date(t.date).toLocaleDateString("en-GB")}
                                </div>

                                {/* AMOUNT */}
                                <div className={`flex items-center justify-center font-semibold text-lg ${t.type === "income" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                                    {t.type === "income" ? "+₹" : "-₹"}
                                    {Number(t.amount).toLocaleString()}
                                </div>

                                {/* ACTIONS */}
                                <div className="flex items-center justify-center gap-3">

                                    <NavLink to={`/dashboard/?edit=${t._id}`} className="w-10 h-10 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400 transition">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </NavLink>

                                    <button onClick={() => handleDelete(t._id)} className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-500 dark:text-red-400 transition">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))
                ) : (
                    <div className="py-16 text-center">
                        <h2 className="text-gray-600 dark:text-gray-400 text-lg">No transactions found</h2>
                        <p className="text-gray-500 dark:text-gray-600 text-sm mt-1">
                            Try adjusting filters or adding a new transaction
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Transections;