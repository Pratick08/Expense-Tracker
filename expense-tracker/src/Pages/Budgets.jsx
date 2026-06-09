import { useSelector } from "react-redux"
import toast from "react-hot-toast";
import { useState ,useEffect} from "react"
import { useDispatch } from "react-redux";
import { createBudget, deleteBudget } from "../redux/budgetSlice";
import { fetchBudgets } from '../redux/budgetSlice'
import { fetchTransactions } from '../redux/expenceSlice'
const Budgets = () => {
    const dispatch = useDispatch()
    const transactionDatas = useSelector((state) => state.expence.transactionDatas);
    const budgetDatas = useSelector((state) => state.budgets.budgetDatas);
    useEffect(() => {
        dispatch(fetchBudgets())
            dispatch(
        fetchTransactions({
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        })
    );

    }, [dispatch])

    const [budgetCategory, setBudgetCategory] = useState('Food');
    const [budgetAmount, setBudgetAmount] = useState('');

    const totalBudget = budgetDatas.reduce((acc, item) => acc + item.amount, 0);
    const totalSpent = transactionDatas.filter(
        (item) => item.type === "expense"
    )
    .reduce((acc, item) => acc + item.amount, 0);
    // console.log("Expense", totalExpense)
    function handleBudget() {

        if (budgetAmount === '') {
            toast.error("Please fill all the fields")
            return;
        }

        const alreadyExists = budgetDatas.find(
            (item) => item.category === budgetCategory
        )

        if (alreadyExists) {
            toast.error("Budget already exists")
            return;
        }

        const budgetData = {
            category: budgetCategory,
            amount: Number(budgetAmount)
        }

        dispatch(createBudget(budgetData));
        setBudgetAmount('');
        setBudgetCategory('Food');
    }

    function handleDeleteCard(cardId) {
        dispatch(deleteBudget(cardId))
        // console.log(cardId)
    }
    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-[#020617] text-black dark:text-white p-6 transition-all duration-300">

            {/* Budget Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {/* Total Budget */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-all duration-300">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Total Budget
                            </p>

                            <h1 className="text-4xl font-bold text-black dark:text-white mt-2">
                                ₹{totalBudget}
                            </h1>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-2xl text-cyan-400">
                            💰
                        </div>

                    </div>

                </div>

                {/* Total Spent */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-all duration-300">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Total Spent
                            </p>

                            <h1 className="text-4xl font-bold text-red-400 mt-2">
                                ₹{totalSpent}
                            </h1>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center text-2xl text-red-400">
                            📉
                        </div>

                    </div>

                </div>

                {/* Remaining */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-all duration-300">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Remaining
                            </p>

                            <h1 className={`text-4xl font-bold mt-2 ${budgetDatas.length > 0 ? "text-green-400" : "text-gray-400"}`}>
                                {
                                    budgetDatas.length > 0
                                        ? `₹${totalBudget - totalSpent}`
                                        : "--"
                                }
                            </h1>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl text-green-400">
                            📈
                        </div>

                    </div>

                </div>

                {/* Active Budgets */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-all duration-300">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Active Budgets
                            </p>

                            <h1 className="text-4xl font-bold text-yellow-400 mt-2">
                                {budgetDatas.length}
                            </h1>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-2xl text-yellow-400">
                            🎯
                        </div>

                    </div>

                </div>

            </div>

            {/* Create Budget Form */}
            <div className="mt-8 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-lg transition-all duration-300">

                <div className="mb-8">

                    <h2 className="text-3xl font-bold text-black dark:text-white">
                        Create Budget
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Set spending limits for categories
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Category */}
                    <div>

                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Category
                        </label>

                        <select value={budgetCategory} className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-4 text-black dark:text-white outline-none focus:border-cyan-500 transition-all duration-300" onChange={(e) => setBudgetCategory(e.target.value)}>

                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>

                        </select>

                    </div>

                    {/* Limit */}
                    <div>

                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Budget Limit
                        </label>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={budgetAmount}
                            className="w-full bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 rounded-2xl px-4 py-4 text-black dark:text-white outline-none focus:border-cyan-500 transition-all duration-300"
                            onChange={(e) => setBudgetAmount(e.target.value)}
                        />

                    </div>

                    {/* Button */}
                    <div className="flex items-end">

                        <button className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-4 rounded-2xl text-black font-bold shadow-lg shadow-cyan-500/20" onClick={handleBudget}>
                            Save Budget
                        </button>

                    </div>

                </div>

            </div>

            {/* Budget Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                {
                    budgetDatas.length > 0 ?
                        budgetDatas.map((item) => {
                            const spent = transactionDatas.filter(
                                (transaction) =>
                                    transaction.type === "expense" &&
                                    transaction.category === item.category.toLowerCase()
                            ).reduce((acc, transaction) => acc + transaction.amount, 0)

                            const percentage = Math.min((spent / item.amount) * 100, 100).toFixed(0)

                            const categoryIcons = {
                                Food: "🍔",
                                Travel: "✈️",
                                Shopping: "🛍️",
                                Bills: "📄"
                            }
                            const getColor = (percentage) => {

                                if (percentage >= 80) {
                                    return "from-red-500 to-pink-500";
                                }

                                if (percentage >= 50) {
                                    return "from-orange-400 to-yellow-400";
                                }

                                if (percentage >= 25) {
                                    return "from-cyan-400 to-blue-500";
                                }

                                return "from-emerald-400 to-green-500";
                            };

                            return (
                                <div key={item._id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-all duration-300">

                                    <div className="flex items-center justify-between mb-5">

                                        <div>

                                            <h2 className="text-2xl font-bold text-black dark:text-white">
                                                {item.category}
                                            </h2>

                                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                                Monthly spending limit
                                            </p>

                                        </div>

                                        <div className="text-3xl">
                                            {categoryIcons[item.category]}
                                        </div>

                                    </div>

                                    <div className="flex items-center justify-between mb-4">

                                        <p className="text-gray-700 dark:text-gray-300">
                                            ₹{spent} / ₹{item.amount}
                                        </p>

                                        <p className="text-cyan-400 font-semibold">
                                            {percentage}%
                                        </p>

                                    </div>

                                    <div className="w-full bg-gray-200 dark:bg-[#1e293b] rounded-full h-4 overflow-hidden">

                                        <div
                                            className={`h-full rounded-full bg-linear-to-r ${getColor(percentage)} transition-all duration-700`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>

                                    </div>

                                    <div className="mt-4 flex items-center justify-between">

                                        {
                                            spent < item.amount ? (
                                                <p className="text-green-400">
                                                    ₹{item.amount - spent} Remaining
                                                </p>
                                            ) : (
                                                <p className="text-red-400">
                                                    ⚠ Budget Exceeded
                                                </p>
                                            )
                                        }

                                        <button className="text-red-400 hover:text-red-500 transition-all duration-300" onClick={() => handleDeleteCard(item._id)}>
                                            Delete
                                        </button>

                                    </div>

                                </div>
                            )
                        }) :

                        <div className="col-span-full py-6">

                            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-10 w-full text-center shadow-lg transition-all duration-300">

                                <div className="text-6xl mb-5">
                                    🎯
                                </div>

                                <h1 className="text-3xl font-bold text-black dark:text-white">
                                    No Budgets Found
                                </h1>

                                <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
                                    You haven't created any budget yet.
                                    Start managing your spending by creating one.
                                </p>

                            </div>

                        </div>
                }

            </div>

        </div>
    )
}

export default Budgets