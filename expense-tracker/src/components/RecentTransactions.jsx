
const RecentTransactions = ({ transactionDatas }) => {
    const recent = [...transactionDatas]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    return (
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <h2 className="text-lg font-bold text-black dark:text-white">
                    Recent Transactions
                </h2>

                <span className="text-xs text-gray-500 dark:text-slate-400">
                    Last 5 transactions
                </span>

            </div>

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-4 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-3 mb-3">

                <div>Transaction</div>
                <div>Category</div>
                <div className="text-center">Date</div>
                <div className="text-right">Amount</div>

            </div>

            {/* Body */}
            <div className="space-y-3">

                {recent.map((t) => (
                    <div
                        key={t._id}
                        className="grid grid-cols-1 sm:grid-cols-4 items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-none hover:bg-gray-50 dark:hover:bg-[#111827] rounded-lg px-2 transition"
                    >

                        {/* Transaction */}
                        <div className="flex flex-col">
                            <span className="font-medium text-black dark:text-white">
                                {t.title}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {t.type === "income" ? "Income" : "Expense"}
                            </span>
                        </div>

                        {/* Category */}
                        <div className="text-sm text-gray-600 dark:text-gray-300 capitalize mt-1 sm:mt-0">
                            {t.category}
                        </div>

                        {/* Date */}
                        <div className="text-sm text-gray-500 dark:text-gray-400 text-left sm:text-center mt-1 sm:mt-0">
                            📅{new Date(t.date).toLocaleDateString("en-GB")}
                        </div>

                        {/* Amount */}
                        <div className={`text-sm sm:text-right font-semibold mt-1 sm:mt-0 ${t.type === "income"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}>
                            {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString()}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default RecentTransactions
