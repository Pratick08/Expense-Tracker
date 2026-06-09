import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import { useSelector } from "react-redux";
import { useMemo } from "react";

const COLORS = ["#06b6d4", "#9406cc", "#10b981", "#ef4444", "#8b5cf6"];

const PieChartBox = () => {

    const transactionDatas = useSelector(
        (state) => state.expence.transactionDatas
    );

    //  EXPENSE ONLY
    const expenseData = useMemo(() => {
        if (!transactionDatas) return [];
        return transactionDatas.filter(t => t.type === "expense");
    }, [transactionDatas]);

    const isEmpty = expenseData.length === 0;

    //  GROUP DATA
    const pieData = useMemo(() => {

        if (isEmpty) return [];

        const grouped = {};

        expenseData.forEach((t) => {
            const category = t.category || "Other";
            const amount = Number(t.amount) || 0;

            grouped[category] = (grouped[category] || 0) + amount;
        });

        const total = Object.values(grouped).reduce((a, b) => a + b, 0);

        return Object.entries(grouped).map(([name, value]) => ({
            name,
            value,
            percent: total === 0 ? 0 : Number(((value / total) * 100).toFixed(1)),
        }));

    }, [expenseData, isEmpty]);


    //  QUICK INSIGHTS
    const insights = useMemo(() => {

        if (isEmpty) {
            return {
                highest: "-",
                lowest: "-",
                mostUsed: "-",
                transactions: 0
            };
        }

        const grouped = {};

        expenseData.forEach(t => {
            const cat = t.category || "Other";
            grouped[cat] = (grouped[cat] || 0) + Number(t.amount || 0);
        });

        const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

        return {
            highest: sorted[0]?.[0] || "-",
            lowest: sorted[sorted.length - 1]?.[0] || "-",
            mostUsed: sorted[0]?.[0] || "-",
            transactions: expenseData.length
        };

    }, [expenseData, isEmpty]);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">

            {/* LEFT SIDE (PIE CHART) */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-colors duration-300">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-black dark:text-white">
                            Top Categories
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Spending  This Month
                        </p>
                    </div>
                </div>

                {/* CHART + BARS SIDE BY SIDE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* PIE CHART */}
                    <div className="h-72 min-w-0 flex items-center justify-center">

                        {isEmpty ? (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <div className="text-5xl mb-2">📊</div>
                                <p>No Expense Data</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>

                                    <Pie
                                        className="cursor-pointer"
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={110}
                                        paddingAngle={4}
                                        stroke="none"
                                    >
                                        {pieData.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "12px",
                                            color: "#000",
                                        }}
                                    />

                                    <Legend />

                                </PieChart>
                            </ResponsiveContainer>
                        )}

                    </div>

                    {/* CATEGORY BARS */}
                    {!isEmpty && (
                        <div className="space-y-5">

                            {pieData.map((cat, index) => {

                                const getColor = (percent) => {
                                    if (percent >= 60) {
                                        return "from-red-500 to-pink-500";
                                    }

                                    if (percent >= 40) {
                                        return "from-orange-400 to-yellow-400";
                                    }

                                    if (percent >= 20) {
                                        return "from-cyan-400 to-blue-500";
                                    }

                                    return "from-emerald-400 to-green-500";
                                };

                                return (

                                    <div
                                        key={index}
                                        className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                                    >

                                        {/* Top Row */}
                                        <div className="flex items-center justify-between mb-3">

                                            <div className="flex items-center gap-3">

                                                {/* Dot */}
                                                <div
                                                    className={`w-3 h-3 rounded-full bg-linear-to-r ${getColor(cat.percent)}`}
                                                />

                                                {/* Category */}
                                                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                                                    {cat.name === "food"
                                                        ? "Food"
                                                        : cat.name === "travel"
                                                            ? "Travel"
                                                            : cat.name === "shopping"
                                                                ? "Shopping"
                                                                : "Bills"}
                                                </h3>

                                            </div>

                                            {/* Percentage */}
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                                                {cat.percent}%
                                            </span>

                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">

                                            <div
                                                className={`h-3 rounded-full bg-linear-to-r ${getColor(cat.percent)} transition-all duration-700`}
                                                style={{ width: `${cat.percent}%` }}
                                            />

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-lg transition-colors duration-300">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h2 className="text-2xl font-bold text-black dark:text-white">
                            Quick Insights
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Smart overview of your financial activity
                        </p>

                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-2xl">
                        ⚡
                    </div>

                </div>

                {/* EMPTY STATE */}
                {
                    isEmpty ? (

                        <div className="flex flex-col items-center justify-center py-10 text-center">

                            <div className="text-6xl mb-4">
                                📊
                            </div>

                            <h3 className="text-black dark:text-white text-xl font-semibold">
                                No Insights Available
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-sm leading-relaxed">
                                Add some transactions to generate financial insights and analytics.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {/* CARD */}
                            <div className="flex items-center justify-between bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 transition-colors duration-300">

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-red-500/20 flex items-center justify-center text-xl">
                                        📉
                                    </div>

                                    <div>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Highest Spending
                                        </p>

                                        <h3 className="text-black dark:text-white font-semibold">
                                            {insights.highest}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                            {/* CARD */}
                            <div className="flex items-center justify-between bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 transition-colors duration-300">

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-green-500/20 flex items-center justify-center text-xl">
                                        📈
                                    </div>

                                    <div>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Lowest Spending
                                        </p>

                                        <h3 className="text-black dark:text-white font-semibold">
                                            {insights.lowest}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                            {/* CARD */}
                            <div className="flex items-center justify-between bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 transition-colors duration-300">

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center text-xl">
                                        🏆
                                    </div>

                                    <div>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Most Used Category
                                        </p>

                                        <h3 className="text-black dark:text-white font-semibold">
                                            {insights.mostUsed}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                            {/* CARD */}
                            <div className="flex items-center justify-between bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4 transition-colors duration-300">

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-yellow-500/20 flex items-center justify-center text-xl">
                                        💳
                                    </div>

                                    <div>

                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Expense Transactions
                                        </p>

                                        <h3 className="text-black dark:text-white font-semibold">
                                            {insights.transactions}
                                        </h3>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>
    );
};

export default PieChartBox;