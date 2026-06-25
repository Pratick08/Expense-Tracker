/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction, updateTransaction, fetchTransactions, fetchMonthlyTransactions } from "../redux/expenceSlice";
import { useSearchParams } from "react-router";
import toast from 'react-hot-toast';
import SummaryCards from "../components/SummaryCards";
import PieChartBox from "../components/PieChartBox.jsx";
import RecentTransactions from "../components/RecentTransactions.jsx";
import BarChartBox from "../components/BarChartBox.jsx";

const Dashboard = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('salary');
    const [date, setDate] = useState('')

    const [searchParams, setSearchParams] = useSearchParams();

    const monthlyTrend = useSelector((state) => state.expence.monthlyTrend)
    // .log("monthlyTrend", monthlyTrend)

    const [month, setMonth] = useState(
        new Date().getMonth() + 1
    )

    const [year, setYear] = useState(
        new Date().getFullYear()
    )
    const transactionDatas = useSelector((state) => state.expence.transactionDatas);
    const transactionId = searchParams.get("edit");
  
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchTransactions(
            {
                month,
                year
            }
        ));
    }, [dispatch, month, year]);

    useEffect(() => {
        dispatch(fetchMonthlyTransactions());
    }, [dispatch, transactionDatas]);

    useEffect(() => {
        if (transactionId) {
            const transaction = transactionDatas.find(
                (item) => String(item._id) === String(transactionId)
            );
            setTitle(transaction.title);
            setAmount(transaction.amount);
            setType(transaction.type);
            setCategory(transaction.category);
            setDate(transaction.date);

        } else {
            setTitle('');
            setAmount('');
            setType("income");
            setCategory("salary");
            setDate('');
        }
    }, [transactionId, transactionDatas])

    // .log("first-id", transactionId);

    function handleTransaction() {  
        const transactionData = {
            //   _id: transactionId || Date.now().toString(36),
            title,
            amount: Number(amount),
            type: type.toLowerCase(),
            category: category.toLowerCase(),
            date

        }

        if (title.trim() != '' && Number(amount) > 0 && date) {

            if (transactionId) {
                // .log("hello world",transactionId);
                dispatch(updateTransaction({
                    id: transactionId,
                    transactionData: {
                        title,
                        amount: Number(amount),
                        type: type.toLowerCase(),
                        category: category.toLowerCase(),
                        date
                    }
                }));
            } else {
                dispatch(addTransaction(transactionData));
            }

            setTitle('');
            setAmount('');
            setType("income");
            setCategory("salary");
            setDate('');
            setSearchParams({})

        }
        else {

            toast.error("Please fill all the fields")

        }

    }
    const handleTypeChange = (value) => {
        setType(value);

        // only set default once
        if (value === "income") {
            setCategory("salary");
        } else {
            setCategory("food");
        }
    };
    //creating income variable
    // .date
    return (

        <div className="w-full min-h-screen bg-gray-100 dark:bg-[#020617] text-black dark:text-white p-6 transition-colors duration-300">
            <div className="mb-8">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* Left Content */}
                    <div>

                        <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                            Dashoard
                        </h1>

                        <p className="mt-2 text-gray-600 dark:text-slate-400 text-base md:text-lg">
                            Track your finances and stay on top of your goals.
                        </p>

                    </div>

                    {/* Right Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">

                        <select
                            value={month}
                            className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-slate-700  text-black dark:text-slate-200 px-5 py-3 rounded-2xl  outline-none  focus:border-cyan-500 transition-all duration-300"
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>

                        <select
                            value={year}
                            className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-slate-700  text-black dark:text-slate-200 px-5 py-3 rounded-2xl outline-none focus:border-cyan-500 transition-all duration-300"
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>

                    </div>

                </div>

            </div>

            {/* Summary Cards */}
            <SummaryCards />

            {/* Transaction Form */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
                {/* Existing Form */}
                <div>

                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg">

                        <div className="mb-6">

                            <h2 className="text-2xl font-bold text-black dark:text-white">
                                Add Transaction
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Add your income and expenses easily
                            </p>

                        </div>

                        {/* Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Title */}
                            <div>

                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    placeholder="Enter title"
                                    className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-4 text-black dark:text-white outline-none focus:border-cyan-500 transition-all duration-300"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                            </div>

                            {/* Amount */}
                            <div>

                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={amount}
                                    className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-4 text-black dark:text-white outline-none focus:border-cyan-500 transition-all duration-300"
                                    onChange={(e) => setAmount(e.target.value)}
                                />

                            </div>

                            {/* Type */}
                            <div>

                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    Type
                                </label>

                                <select
                                    value={type}
                                    onChange={(e) => handleTypeChange(e.target.value)}

                                    className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-4 text-black dark:text-white outline-none focus:border-cyan-500 transition-all duration-300"
                                >

                                    <option value="income">
                                        Income
                                    </option>

                                    <option value="expense">
                                        Expense
                                    </option>

                                </select>

                            </div>

                            {/* Category */}
                            <div>

                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    Category
                                </label>

                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-4 text-black dark:text-white outline-none focus:border-cyan-500 transition-all duration-300"
                                >
                                    <option value="food">Food</option>
                                    <option value="travel">Travel</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="bills">Bills</option>
                                    <option value="salary">Salary</option>
                                </select>

                            </div>

                            {/* Date */}
                            <div className="md:col-span-2">

                                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    value={date}
                                    className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-4 text-black dark:text-white outline-none focus:border-cyan-500 transition-all duration-300"
                                    onChange={(e) => setDate(e.target.value)}
                                />

                            </div>

                            {/* Button */}
                            <div className="md:col-span-2">

                                <button
                                    className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-4 rounded-2xl text-black font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                                    onClick={handleTransaction}
                                >
                                    {
                                        transactionId ? "Update Transaction" : "Add Transaction"
                                    }
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                
                <div className="xl:col-span-2">

                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg h-full">

                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-black dark:text-white">
                                Monthly Income vs Expense Trend
                            </h2>

                            <p className="text-gray-600 dark:text-slate-400 mt-2">
                                Compare your monthly income and expenses.
                            </p>
                        </div>
                        <BarChartBox monthlyTrend={monthlyTrend} />

                    </div>

                </div>



            </div>

            <PieChartBox />

            <RecentTransactions transactionDatas={transactionDatas} />

        </div>

    )
}

export default Dashboard